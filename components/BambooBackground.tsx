import React from 'react';

const BambooBackground: React.FC = () => {
  return (
    <div className="fixed inset-0 -z-10 h-full w-full bg-bamboo-12 bg-[radial-gradient(#15391c_1px,transparent_1px)] [background-size:16px_16px]">
        <div className="absolute inset-0 bg-gradient-to-br from-bamboo-12/80 via-bamboo-12 to-bamboo-12/80"></div>
    </div>
  );
};

export default BambooBackground;