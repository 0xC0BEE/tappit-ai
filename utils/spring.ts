import React from 'react';

/**
 * A CSS-in-JS object for a spring-like transition on the `transform` property.
 * This is used for animations like scaling, rotating, and moving elements.
 */
export const springTransition: React.CSSProperties = {
  transition: 'transform 0.5s cubic-bezier(0.2, 1.2, 0.8, 1.2)',
};

/**
 * A CSS-in-JS object for a spring-like transition on all animatable properties.
 * This is used for components where properties like background-color or opacity
 * need to animate alongside transforms.
 */
export const springTransitionAll: React.CSSProperties = {
  transition: 'all 0.5s cubic-bezier(0.2, 1.2, 0.8, 1.2)',
};
