"use client";

import { Smile } from "lucide-react";
import Picker from "@emoji-mart/react";
import data from "@emoji-mart/data";
import { useTheme } from "next-themes";
import i18n from '@emoji-mart/data/i18n/pt.json'
import Picker2, { Categories} from 'emoji-picker-react';

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ca } from "date-fns/locale";



interface EmojiPickerProps {
  onChange: (value: string) => void;
}

export const EmojiPicker = ({
  onChange,
}: EmojiPickerProps) => {
  const { resolvedTheme } = useTheme();

  return (
    <Popover>
      <PopoverTrigger>
        <Smile
          className="text-zinc-500 dark:text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition"
        />
      </PopoverTrigger>
      <PopoverContent 
        side="right" 
        sideOffset={40}
        className="bg-transparent border-none shadow-none drop-shadow-none mb-16"
      >
       {/*
        <Picker
          i18n={i18n}
          theme={resolvedTheme}
          data={data}
          onEmojiSelect={(emoji: any) => onChange(emoji.native)}
          />
       */}
        <Picker2 
          previewConfig={
            {
              defaultCaption: "Como você esta!?", // defaults to: "What's your mood?"
            }
          }
        
        
        
          searchPlaceholder="Pesquisar"
          onEmojiClick={(emojiData, event) => onChange(emojiData.emoji)} />
     
        </PopoverContent>
    </Popover>
  )
}