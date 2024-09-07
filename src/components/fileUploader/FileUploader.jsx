import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function FileUploader({ className, onFileChange, ...props }) {
  const handleFileChange = (e) => {
    if (onFileChange) {
      onFileChange(e.target.files[0]); // Pass the selected file to the parent
    }
  };

  return (
    <div className={className} {...props}>
      <Label
        htmlFor="picture"
        className="w-full text-right text-zinc-400 font-normal text-[14px]"
      >
        ارفع شعار المتجر
      </Label>
      <Input
        id="picture"
        type="file"
        onChange={handleFileChange}
        className="mt-2 left bg-gray_1 grid items-center"
      />
    </div>
  );
}
