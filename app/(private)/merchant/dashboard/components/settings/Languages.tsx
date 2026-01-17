import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";

type FormData = {
  language: string;
};

export default function LanguageSettings() {
  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      language: "english",
    },
  });

  const onSubmit = (data: FormData) => {
    console.log("Language Settings:", data);
  };

  return (
    <div className="container max-w-3xl mx-auto p-4">
      <div className="p-5 border rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Language Settings</h2>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="flex flex-col">
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <RadioGroup
                  {...field}
                  className="space-y-4"
                  onValueChange={field.onChange}
                >
                  {/* English */}
                  <label
                    htmlFor="english"
                    className={`
                      flex items-center justify-between gap-2
                      border rounded-xl p-3 cursor-pointer
                      transition-all duration-200
                      hover:border-primary hover:bg-muted/40
                      ${
                        field.value === "english"
                          ? "border-primary bg-primary/10 ring-[0.1px] ring-primary"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/english_flag.png"
                        alt="English Flag"
                        height={30}
                        width={30}
                      />
                      <p className="font-medium text-[16px]">English</p>
                    </div>
                    <RadioGroupItem value="english" id="english" />
                  </label>

                  {/* Arabic */}
                  <label
                    htmlFor="arabic"
                    className={`
                      flex items-center justify-between gap-2
                      border rounded-xl p-3 cursor-pointer
                      transition-all duration-200
                      hover:border-primary hover:bg-muted/40
                      ${
                        field.value === "arabic"
                          ? "border-primary bg-primary/10 ring-[0.1px] ring-primary"
                          : ""
                      }
                    `}
                  >
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/arabic_flag.png"
                        alt="Arabic Flag"
                        height={30}
                        width={30}
                      />
                      <p className="font-medium text-[16px]">العربية</p>
                    </div>
                    <RadioGroupItem value="arabic" id="arabic" />
                  </label>
                </RadioGroup>
              )}
            />
          </div>
        </form>
      </div>

      <div>
        <Button type="submit" className="flex ml-auto mt-4 cursor-pointer">
          Save Change
        </Button>
      </div>
    </div>
  );
}
