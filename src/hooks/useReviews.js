import { useState, useEffect, useCallback } from 'react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';

// Moderate review content using Supabase Edge Function
async function moderateReview(text) {
  if (!text || text.trim().length === 0) {
    return { approved: true };
  }

  try {
    const { data, error } = await supabase.functions.invoke('moderate-review', {
      body: { text },
    });

    if (error) {
      console.error('Moderation error:', error);
      // If moderation fails, allow the review (fail open for MVP)
      return { approved: true };
    }

    return data;
  } catch (err) {
    console.error('Moderation request failed:', err);
    return { approved: true };
  }
}

export function useReviews(gameSlug) {
  const [reviews, setReviews] = useState([]);
  const [stats, setStats] = useState({ averageRating: 0, reviewCount: 0 });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch reviews for a game
  const fetchReviews = useCallback(async () => {
    if (!isSupabaseConfigured() || !gameSlug) {
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError(null);

      // Fetch reviews
      const { data: reviewsData, error: reviewsError } = await supabase
        .from('game_reviews')
        .select('*')
        .eq('game_slug', gameSlug)
        .order('created_at', { ascending: false });

      if (reviewsError) throw reviewsError;

      setReviews(reviewsData || []);

      // Calculate stats
      if (reviewsData && reviewsData.length > 0) {
        const total = reviewsData.reduce((sum, r) => sum + r.rating, 0);
        setStats({
          averageRating: total / reviewsData.length,
          reviewCount: reviewsData.length,
        });
      } else {
        setStats({ averageRating: 0, reviewCount: 0 });
      }
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [gameSlug]);

  // Submit a new review
  const submitReview = async ({ rating, comment, userEmail }) => {
    if (!isSupabaseConfigured()) {
      throw new Error('Reviews are not configured');
    }

    if (!userEmail) {
      throw new Error('You must be signed in to leave a review');
    }

    if (!rating || rating < 1 || rating > 5) {
      throw new Error('Please select a rating');
    }

    // Moderate the comment if provided
    if (comment && comment.trim().length > 0) {
      const moderation = await moderateReview(comment);
      if (!moderation.approved) {
        throw new Error(
          moderation.reason ||
            "Your review couldn't be posted. Please keep it family-friendly!"
        );
      }
    }

    // Upsert the review (insert or update if exists)
    const { data, error: insertError } = await supabase
      .from('game_reviews')
      .upsert(
        {
          game_slug: gameSlug,
          user_email: userEmail,
          rating,
          comment: comment?.trim() || null,
        },
        {
          onConflict: 'game_slug,user_email',
        }
      )
      .select()
      .single();

    if (insertError) {
      console.error('Error submitting review:', insertError);
      throw new Error('Failed to submit review. Please try again.');
    }

    // Refresh reviews
    await fetchReviews();

    return data;
  };

  // Check if user has already reviewed this game
  const getUserReview = useCallback(
    (userEmail) => {
      if (!userEmail) return null;
      return reviews.find((r) => r.user_email === userEmail);
    },
    [reviews]
  );

  // Initial fetch
  useEffect(() => {
    fetchReviews();
  }, [fetchReviews]);

  return {
    reviews,
    stats,
    loading,
    error,
    submitReview,
    getUserReview,
    refetch: fetchReviews,
    isConfigured: isSupabaseConfigured(),
  };
}

// Hook to fetch rating stats for multiple games (for GameCard grid)
export function useGameRatings(gameSlugs) {
  const [ratings, setRatings] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchRatings() {
      if (!isSupabaseConfigured() || !gameSlugs || gameSlugs.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('game_rating_stats')
          .select('*')
          .in('game_slug', gameSlugs);

        if (error) throw error;

        // Convert to a lookup object
        const ratingsMap = {};
        data?.forEach((stat) => {
          ratingsMap[stat.game_slug] = {
            averageRating: parseFloat(stat.average_rating) || 0,
            reviewCount: parseInt(stat.review_count) || 0,
          };
        });

        setRatings(ratingsMap);
      } catch (err) {
        console.error('Error fetching ratings:', err);
      } finally {
        setLoading(false);
      }
    }

    fetchRatings();
  }, [gameSlugs]);

  return { ratings, loading };
}
