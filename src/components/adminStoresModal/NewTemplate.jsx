import React, { useEffect, useState } from "react";
import Modal from "../modal/Modal";
import { Input } from "../ui/input";
import Loader from "../loader/Loader";
import { Button } from "../ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "../ui/label";
import axios from "axios";

function NewTemplate({ open = true, setOpen, store }) {
  const [loading, setLoading] = useState(false);
  const [template, setTemplate] = useState({
    entity_id: store.id,
    name: store.tempName,
    content: store.tempContent,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    
    try {
      const response = await axios.post("http://localhost:3002/api/v1/templates", {
     
          name: template.name,
          content: template.content,
          entity_id: template.entity_id, // Include this if necessary
        
      },{
        withCredentials: true
      });
      
      console.log("Response:", response.data);
      alert("Template added successfully");
      setTemplate({ entity_id: store.entity_id, name: "", content: "" }); // Reset the form
      setOpen(false); // Close the modal
    } catch (error) {
      console.error("Error adding template:", error);
      alert("Failed to add template");
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    if (open) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [open]);

  return (
    <Modal open={open} className={"max-w-[500px] min-w-[300px]"}>
      <div className="w-full text-right mb-4">
        <h2 className="text-base font-semibold">اضافة قالب</h2>
        <p className="text-sm text-muted-foreground">املئ الحقول الاتيه </p>
      </div>
      <form onSubmit={handleSubmit} className="w-full">
        <label htmlFor="name" className="block text-sm mb-2 text-right">
          الاسم
        </label>
        <Input
          id="name"
          type="text"
          value={template.name}
          onChange={(e) => setTemplate({ ...template, name: e.target.value })}
          className="w-full mb-4"
          required
        />

        <Label htmlFor="content" className="block text-sm mb-2 text-right">
          المحتوى
        </Label>
        <Textarea
          id="content"
          value={template.content}
          onChange={(e) =>
            setTemplate({ ...template, content: e.target.value })
          }
          className="w-full mb-4"
          required
        />
        <div
          dir="rtl"
          className="w-full h-9 flex-row-reverse flex justify-between items-center"
        >
          <Button
            disabled={loading}
            variant="ghost"
            type="button"
            className="h-full w-20"
            onClick={() => {
              setTemplate({ entity_id: store.entity_id, name: "", content: "" }); // Reset the form
              setOpen(false); // Close the modal
            }}
          >
            خروج
          </Button>
          <Button
            variant="default"
            type="submit"
            className={`h-full w-20 transition-all duration-300 ease-in ${
              loading &&
              "opacity-50 w-32 flex flex-row-reverse gap-2 cursor-not-allowed"
            }`}
            disabled={loading || !template.name || !template.content}
          >
            <p className="right transition-all duration-300 ease-in">اضافة</p>
            <span className="block scale-75">{loading && <Loader />}</span>
          </Button>
        </div>
      </form>
    </Modal>
  );
}

export default NewTemplate;
