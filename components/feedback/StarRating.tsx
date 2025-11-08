import * as React from 'react';

const StarRating: React.FC = () => {
    return (
        <div className="flex space-x-1 text-2xl text-yellow-400">
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>★</span>
            <span>☆</span>
        </div>
    );
};

export default StarRating;