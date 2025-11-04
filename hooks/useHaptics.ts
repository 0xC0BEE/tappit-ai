import { useCallback } from 'react';

export enum HapticPattern {
    Success = 'Success',
    Pulse = 'Pulse',
    Knock = 'Knock',
    Click = 'Click',
}

const patterns: Record<HapticPattern, number[]> = {
    [HapticPattern.Success]: [50, 50, 50],
    [HapticPattern.Pulse]: [100],
    [HapticPattern.Knock]: [0, 50, 80, 50],
    [HapticPattern.Click]: [50],
};

export const useHaptics = () => {
    const playHaptic = useCallback((pattern: HapticPattern) => {
        if (navigator.vibrate) {
            navigator.vibrate(patterns[pattern]);
        }
    }, []);

    return { playHaptic };
};
