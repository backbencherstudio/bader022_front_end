import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"; // ShadCN Radio Group component
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
      <div className=" p-5 border rounded-xl">
        <h2 className="text-xl font-semibold mb-4">Language Settings</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Language Settings */}
          <div className="flex flex-col">
            {/* Radio buttons for selecting language */}
            <Controller
              control={control}
              name="language"
              render={({ field }) => (
                <RadioGroup
                  {...field} // Spread the controller field to bind with the radio buttons
                  className="space-y-4"
                  onValueChange={field.onChange} // Ensure value change is handled correctly
                >
                  {/* English option with flag */}
                  <div className="flex items-center justify-between gap-2 border rounded-xl p-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/english_flag.png"
                        alt="English Flag"
                        height={30}
                        width={30}
                      />{" "}
                      <p className="font-medium text-[16px]"> English</p>
                    </div>
                    <RadioGroupItem value="english" id="english" />
                  </div>

                  {/* Arabic option with flag */}
                  <div className="flex items-center justify-between gap-2 border rounded-xl p-2">
                    <div className="flex items-center gap-2">
                      <Image
                        src="/images/arabic_flag.png"
                        alt="Arabic Flag"
                        height={30}
                        width={30}
                      />{" "}
                      <p className="font-medium text-[16px]">العربية</p>
                    </div>
                    <RadioGroupItem value="arabic" id="arabic" />
                  </div>
                </RadioGroup>
              )}
            />
          </div>

          {/* Save Changes Button */}
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
