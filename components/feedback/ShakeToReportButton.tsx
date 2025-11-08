import * as React from 'react';

// On native, this could wrap the app and listen for a shake gesture.
// For this web-based example, it's a simple passthrough component.
const ShakeToReportButton: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return <>{children}</>;
};

export default ShakeToReportButton;