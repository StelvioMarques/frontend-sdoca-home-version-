import { create } from "zustand";

const useModalStore = create((set) => ({
  isOpen: false,
  modalType: null,
  data: null,

  open: (modalType, data = null) => {
    set({ isOpen: true, modalType, data })
  },

  close: () => {
    set({ isOpen: false, modalType: null, data: null })
  }
}))

export default useModalStore;
