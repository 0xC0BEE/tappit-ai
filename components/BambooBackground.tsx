import * as React from 'react';

const BambooBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-20 h-full w-full bg-bamboo-12">
        <div className="absolute inset-0 bg-gradient-to-br from-bamboo-12/80 via-bamboo-11 to-bamboo-12"></div>
    </div>
  );
};

export default BambooBackground;