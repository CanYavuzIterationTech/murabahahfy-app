import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
} from "~/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "~/components/ui/dialog";

const TransactionModal = ({
  processingDialog,
  successDialog,
  setSuccessDialogOpen,
  hash,
  failDialog,
  failDialogOpen,
}: {
  processingDialog: boolean;
  successDialog: boolean;
  setSuccessDialogOpen: (open: boolean) => void;
  hash: string;
  failDialog: boolean;
  failDialogOpen: (open: boolean) => void;
}) => {
  return (
    <>
      <AlertDialog open={processingDialog}>
        <AlertDialogContent id="processing-dialog">
          <AlertDialogHeader>
            <AlertDialogTitle>
              Your transaction is being processed
            </AlertDialogTitle>
            <AlertDialogDescription>
              Please wait while your transaction is being processed. This may
              take a few minutes.
            </AlertDialogDescription>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>

      <Dialog
        open={successDialog}
        onOpenChange={() => {
          setSuccessDialogOpen(false);
        }}
      >
        <DialogContent id="success-dialog">
          <DialogHeader>
            <DialogTitle>Transaction completed</DialogTitle>

            <DialogDescription>
              Your transaction has been submitted to the blockchain. You can
              view the status of your transaction{" "}
              <a
                href={`https://explorer.testedge2.haqq.network/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:no-underline"
              >
                here
              </a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Dialog
        open={failDialog}
        onOpenChange={() => {
          failDialogOpen(false);
        }}
      >
        <DialogContent id="fail-dialog">
          <DialogHeader>
            <DialogTitle>Transaction failed</DialogTitle>

            <DialogDescription>
              Your transaction has failed. You can view the status of your
              transaction{" "}
              <a
                href={`https://explorer.testedge2.haqq.network/tx/${hash}`}
                target="_blank"
                rel="noreferrer"
                className="text-primary underline hover:no-underline"
              >
                here
              </a>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default TransactionModal;
