import { AlertDialog, Button, Flex } from '@radix-ui/themes';
import { ReactNode } from 'react';

const Modal = ({
  actionButtonTitle,
  actionButtonHandler,
  description,
  open,
  onClose,
  title,
}: {
  actionButtonTitle: string;
  actionButtonHandler: () => void;
  description?: ReactNode | string;
  open: boolean;
  onClose: () => void;
  title: ReactNode | string;
}) => {
  return (
    <AlertDialog.Root open={open} onOpenChange={onClose}>
      <AlertDialog.Content>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description>{description}</AlertDialog.Description>

        <Flex gap="8px" mt="4" justify="end">
          <AlertDialog.Cancel>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </AlertDialog.Cancel>
          <AlertDialog.Action>
            <Button color="red" onClick={actionButtonHandler} variant="outline">
              {actionButtonTitle}
            </Button>
          </AlertDialog.Action>
        </Flex>
      </AlertDialog.Content>
    </AlertDialog.Root>
  );
};

export default Modal;
