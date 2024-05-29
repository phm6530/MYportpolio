import { create } from 'zustand';

interface BearState {
    bears: number;
}

const useStore = create<BearState>(set => ({
    bears: 0,
    increasePopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllBears: () => set({ bears: 0 }),
    updateBears: (newBears: number) => set({ bears: newBears }),

    fish: 0,
    increasefishPopulation: () => set(state => ({ bears: state.bears + 1 })),
    removeAllfishs: () => set({ bears: 0 }),
    updatefishs: (newBears: number) => set({ bears: newBears }),
}));

export default useStore;
