import Modal from "react-modal";

export default function ImageModal({ isOpen, onClose, imageUrl }) {
  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <div>
        <img src={imageUrl} alt="Large view" />
      </div>
    </Modal>
  );
}
