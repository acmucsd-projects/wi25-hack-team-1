import * as React from "react";
import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  ModalButton,
  SIZE,
  ROLE,
} from "baseui/modal";
import { Button, KIND as ButtonKind } from "baseui/button";

const CreatePostModal = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div>
      <Button onClick={() => setIsOpen(true)}>Create Post</Button>
      <Button onClick={() => setIsOpen(false)}>Close</Button>

      <Modal
        onClose={() => setIsOpen(false)}
        closeable
        isOpen={isOpen}
        animate
        autoFocus
        size={SIZE.default}
        role={ROLE.dialog}
      >
        <ModalHeader>Hello world</ModalHeader>
        <ModalBody>
          Proin ut dui sed metus pharetra hend rerit vel non mi. Nulla ornare
          faucibus ex, non facilisis nisl. Maecenas aliquet mauris ut tempus.
        </ModalBody>
        <ModalFooter>
          <ModalButton kind={ButtonKind.tertiary}>Cancel</ModalButton>
          <ModalButton>Okay</ModalButton>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default CreatePostModal;
