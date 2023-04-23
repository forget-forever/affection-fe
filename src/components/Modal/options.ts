import { useState } from "react";

type ModalProps = {
  title: React.ReactNode;
  content: React.ReactNode;
  positiveText?: string; // 积极操作的文字
  passiveText?: string; // 消极/取消操作的文字
  positiveButton?: React.ReactNode;
  passiveButton?: React.ReactNode;
  hideButton?: boolean;
  hidePositiveButton?: boolean;
  hidePassiveButton?: boolean;
}
// eslint-disable-next-line import/no-mutable-exports
export let showModal: React.Dispatch<React.SetStateAction<ModalProps | undefined>> = () => {};

export const useMoalState = () => {
  const [modalState, setModalState] = useState<ModalProps>()
  if (showModal !== setModalState) {
    showModal = setModalState
  }
  return {modalState, setModalState};
}