import { Dialog, Button, Flex } from '@radix-ui/themes';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: React.ReactNode;
  actionButtonTitle: string;
  actionButtonHandler: () => void;
}

const Modal = ({
  open,
  onClose,
  title,
  description,
  actionButtonTitle,
  actionButtonHandler,
}: ModalProps) => {
  return (
    <AnimatePresence>
      {open && (
        <Dialog.Root open={open} onOpenChange={onClose}>
          <Dialog.Content asChild>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2 }}
            >
              <Dialog.Title>{title}</Dialog.Title>
              <Dialog.Description>{description}</Dialog.Description>

              <Flex gap="3" mt="4" justify="end">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Dialog.Close>
                    <Button variant="soft" color="gray">
                      Cancel
                    </Button>
                  </Dialog.Close>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button onClick={actionButtonHandler} color="red">
                    {actionButtonTitle}
                  </Button>
                </motion.div>
              </Flex>
            </motion.div>
          </Dialog.Content>
        </Dialog.Root>
      )}
    </AnimatePresence>
  );
};

export default Modal;
