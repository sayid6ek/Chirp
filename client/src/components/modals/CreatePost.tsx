import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { useModal } from "@/contexts/ModalContext";
import { TbX } from "react-icons/tb";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import CharacterCount from "@tiptap/extension-character-count";
import { useAuth } from "@/contexts/AuthContext";
import defaultAvatar from "@/assets/defaultAvatar.jpg";
import { Button } from "@/components/ui/button";

const CreatePost = () => {
  const { user } = useAuth();
  const { isModalOpen, closeModal } = useModal();

  const limit = 280;

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "What's on your mind?",
      }),
      CharacterCount.configure({
        limit,
      }),
    ],
  });

  if (!editor) {
    return null;
  }

  const input = editor?.getText({ blockSeparator: "\n" }).trim() || "";
  const count = limit - editor.storage.characterCount.characters();

  const percentage = editor
    ? Math.round((100 / limit) * editor.storage.characterCount.characters())
    : 0;

  const onSubmit = async () => {
    console.log(input);
  };

  return (
    <Dialog open={isModalOpen} onOpenChange={closeModal}>
      <DialogContent>
        <div className="py-6 relative">
          <button
            onClick={closeModal}
            className="absolute left-2 top-[50%] translate-y-[-50%] p-[6px] hover:bg-custom-gray-2 rounded-full"
          >
            <TbX className="w-[20px] h-[20px]" />
          </button>
        </div>
        <div className="min-h-32 pt-1 px-4 flex gap-[10px] overflow-y-auto overflow-hidden">
          <div className="w-11 h-11 rounded-full overflow-hidden cursor-pointer flex-shrink-0">
            <img
              src={user?.avatar || defaultAvatar}
              className="w-full h-full object-cover"
              alt="User avatar"
            />
          </div>
          <div className="w-full flex flex-col min-w-0">
            <div className="text-xl mt-[6px] ">
              <form className="pb-10">
                <EditorContent editor={editor} />
              </form>
            </div>
          </div>
        </div>
        <div className="px-4 py-3 mt-auto flex items-center gap-3 justify-end border-t">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs mb-[1px] ${
                count <= 20 ? "text-custom-red-2" : "text-custom-gray-3"
              }`}
            >
              {count}
            </span>
            <span className="h-5 w-[1px] bg-custom-gray-2"></span>
            <div
              className={`character-count ${
                editor.storage.characterCount.characters() === limit
                  ? "character-count--warning"
                  : ""
              }`}
            >
              <svg height="20" width="20" viewBox="0 0 20 20">
                <circle r="10" cx="10" cy="10" className="fill-custom-gray-2" />
                <circle
                  r="5"
                  cx="10"
                  cy="10"
                  fill="transparent"
                  className="stroke-custom-blue-3 stroke-[10px]"
                  strokeDasharray={`calc(${percentage} * 31.4 / 100) 31.4`}
                  transform="rotate(-90) translate(-20)"
                />
                <circle r="6" cx="10" cy="10" className="fill-custom-white" />
              </svg>
            </div>
          </div>
          <Button onClick={onSubmit} disabled={count === 280}>
            Post
          </Button>
        </div>
        <div className="hidden">
          <DialogTitle></DialogTitle>
          <DialogDescription></DialogDescription>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreatePost;
