import * as React from "react";
import { Button } from "@/Components/ui/button";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
  DialogDescription,
  DialogHeader,
  DialogFooter,
} from "@/Components/animate-ui/headless/dialog";
import { Trash2 } from "lucide-react";

export const DialogAnimate = ({
  onclick,
  open,
  onclose,
  onReject,
  onAccept,
}) => {
  return (
    <div>
      <Button
        className={"text-black cursor-pointer"}
        variant="outline"
        onClick={onclick}
      >
        clear History
      </Button>

      <Dialog open={open} onClose={onclose}>
        <DialogBackdrop />

        <DialogPanel className="sm:max-w-[425px] overflow-y-auto">
          <DialogHeader className={"my-4"}>
            <DialogTitle
              className={
                "flex items-center justify-center gap-2 mb-4 text-black"
              }
            >
              <Trash2 />
            </DialogTitle>
            <DialogDescription>
              Are you sure you want to clear your booking history? This action
              cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              className={"text-black cursor-pointer"}
              variant="outline"
              onClick={onReject}
            >
              Decline
            </Button>
            <Button
              className={"bg-red-400 hover:bg-red-400 cursor-pointer"}
              type="submit"
              onClick={onAccept}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogPanel>
      </Dialog>
    </div>
  );
};
