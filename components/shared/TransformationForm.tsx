"use client";
import React, { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  aplanId,
  aspectRatioOptions,
  creditFee,
  defaultValues,
  transformationTypes,
} from "@/constants";
import { useRouter } from "next/navigation";
import { AspectRatioKey, debounce, deepMergeObjects } from "@/lib/utils";
import MediaUploader from "./MediaUploader";
import TransformedImage from "./TransformedImage";
import { updateCredits } from "@/lib/actions/users/user.actions";
import { getCldImageUrl } from "next-cloudinary";
import { addImage, updateImage } from "@/lib/actions/image/image.actions";
import { CustomField } from "./CustomField";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { InsufficientCreditsModal } from "./InsufficientCreditsModal";
import { useToast } from "../ui/use-toast";
import { Checkbox } from "../ui/checkbox";
import { CheckedState } from "@radix-ui/react-checkbox";
import Link from "next/link";
export const formSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters",
  }),
  aspectRatio: z.string().optional(),
  color: z.string().optional(),
  prompt: z.string().optional(),
  publicId: z.string().optional(),
  multiple: z.boolean().optional(),
  removeShadow: z.boolean().optional(),
});
const TransformationForm = ({
  action,
  data = null,
  userId,
  type,
  creditBalance,
  config = null,
  user,
}: TransformationFormProps) => {
  const transformationType = transformationTypes[type];
  const [image, setImage] = useState(data);
  const [newTransformation, setNewTransformation] =
    useState<Transformations | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isTransforming, setIsTransforming] = useState(false);
  const [transformationConfig, setTransformationConfig] = useState(config);
  const [isPending, startTransition] = useTransition();
  const [domLoaded, setDomLoaded] = useState(false);
  const [isMultiple, setIsMultiple] = useState<boolean | CheckedState>(false);
  const [isRemoveshadows, setIsRemoveShadows] = useState<
    boolean | CheckedState
  >(false);
  const router = useRouter();
  const { toast } = useToast();
  const initialValues =
    data && action === "Update"
      ? {
          title: data?.title,
          aspectRatio: data?.aspectRatio,
          color: data?.color,
          prompt: data?.prompt,
          publicId: data?.publicId,
          multiple: data?.multiple,
          removeShadow: data?.removeShadow,
        }
      : defaultValues;

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialValues,
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true);

    if (data || image) {
      const transformationUrl = getCldImageUrl({
        width: image?.width,
        height: image?.height,
        src: image?.publicId,
        ...transformationConfig,
      });

      const imageData = {
        title: values.title,
        publicId: image?.publicId,
        transformationType: type,
        width: image?.width,
        height: image?.height,
        config: transformationConfig,
        secureURL: image?.secureURL,
        transformationUrl: transformationUrl,
        aspectRatio: values.aspectRatio,
        prompt: values.prompt,
        color: values.color,
        multiple: values.multiple,
        removeShadow: values.removeShadow,
      };

      if (action === "Add") {
        try {
          const newImage = await addImage({
            image: imageData,
            userId,
            path: "/dashboard",
          });

          if (newImage) {
            form.reset();
            setImage(data);
            router.push(`/transformations/${newImage.id}`);
          }
        } catch (error) {
          console.log(error);
        }
      }

      if (action === "Update") {
        try {
          const updatedImage = await updateImage(
            {
              image: {
                ...imageData,
              },
              userId,
              path: `/transformations/${data.id}`,
            },
            data?.id
          );

          if (updatedImage) {
            router.push(`/transformations/${updatedImage.id}`);
          }
          if (user.planId !== aplanId && type === "fill") {
            startTransition(async () => {
              await updateCredits(userId, creditFee);
            });
            toast({
              title: "Image uploaded successfully",
              description: "1 credit was deducted from your account",
              duration: 5000,
              className: "success-toast",
            });
          }
        } catch (error) {
          console.log(error);
        }
      }
    }

    setIsSubmitting(false);
  }

  const onSelectFieldHandler = (
    value: string,
    onChangeField: (value: string) => void
  ) => {
    if (action === "Update") {
      setIsTransforming(true);
    }
    const imageSize = aspectRatioOptions[value as AspectRatioKey];

    setImage((prevState: any) => ({
      ...prevState,
      aspectRatio: imageSize.aspectRatio,
      width: imageSize.width,
      height: imageSize.height,
    }));

    setNewTransformation(transformationType.config);

    return onChangeField(value);
  };

  const onInputChangeHandler = (
    fieldName: string,
    value: string,
    type: string,
    onChangeField: (value: string) => void
  ) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          [fieldName === "prompt" ? "prompt" : "to"]: value,
        },
      }));
    }, 1000)();

    return onChangeField(value);
  };
  const onInputCheked = (multiple: boolean | CheckedState) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          multiple,
        },
      }));
    }, 1000)();

    return multiple;
  };
  const onShadowsInput = (removeShadow: boolean | CheckedState) => {
    debounce(() => {
      setNewTransformation((prevState: any) => ({
        ...prevState,
        [type]: {
          ...prevState?.[type],
          removeShadow,
        },
      }));
    }, 1000)();

    return removeShadow;
  };

  const onTransformHandler = async () => {
    console.log(newTransformation);
    setIsTransforming(true);

    setTransformationConfig(
      deepMergeObjects(newTransformation, transformationConfig)
    );

    setNewTransformation(null);
    if (user?.planId !== aplanId) {
      startTransition(async () => {
        await updateCredits(userId, creditFee);
      });
      toast({
        title: "Image uploaded successfully",
        description: "1 credit was deducted from your account",
        duration: 5000,
        className: "success-toast",
      });
    }
  };

  useEffect(() => {
    if (image && (type === "restore" || type === "removeBackground")) {
      setNewTransformation(transformationType.config);
    }
    console.log(image);
  }, [image, transformationType.config, type]);
  useEffect(() => {
    setDomLoaded(true);
  }, []);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <CustomField
          control={form.control}
          name="title"
          formLabel="Image Title"
          className="w-full"
          render={({ field }) => <Input {...field} className="input-field" />}
        />

        {domLoaded && creditBalance < Math.abs(creditFee) && (
          <InsufficientCreditsModal />
        )}
        {type === "fill" && (
          <CustomField
            control={form.control}
            name="aspectRatio"
            formLabel="Aspect Ratio"
            className="w-full"
            render={({ field }) => (
              <Select
                onValueChange={(value) =>
                  onSelectFieldHandler(value, field.onChange)
                }
                value={field.value}
              >
                <SelectTrigger className="space-x-3 space-y-0 rounded-md border p-4 shadow text-primary disabled:opacity-100 p-16-semibold h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent">
                  <SelectValue placeholder="Select size" />
                </SelectTrigger>
                <SelectContent>
                  {Object.keys(aspectRatioOptions).map((key) => (
                    <SelectItem
                      key={key}
                      value={key}
                      className="py-3 cursor-pointer text-primary focus:bg-secondary font-semibold focus:text-background"
                    >
                      {aspectRatioOptions[key as AspectRatioKey].label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
          />
        )}

        {(type === "remove" || type === "recolor") && (
          <>
            <div className="prompt-field">
              <CustomField
                control={form.control}
                name="prompt"
                formLabel={
                  type === "remove" ? "Object to remove" : "Object to recolor"
                }
                className="w-full"
                render={({ field }) => (
                  <>
                    <Input
                      value={field.value}
                      className="input-field"
                      onChange={(e) =>
                        onInputChangeHandler(
                          "prompt",
                          e.target.value,
                          type,
                          field.onChange
                        )
                      }
                    />
                  </>
                )}
              />

              {type === "recolor" && (
                <CustomField
                  control={form.control}
                  name="color"
                  formLabel="Replacement Color"
                  className="w-full"
                  render={({ field }) => (
                    <FormControl>
                      <Input
                        value={field.value}
                        className="space-x-3 space-y-0 rounded-md border p-4 shadow text-primary disabled:opacity-100 p-16-semibold h-[50px] md:h-[54px] focus-visible:ring-offset-0 px-4 py-3 focus-visible:ring-transparent"
                        onChange={(e) =>
                          onInputChangeHandler(
                            "color",
                            e.target.value,
                            "recolor",
                            field.onChange
                          )
                        }
                      />
                    </FormControl>
                  )}
                />
              )}
            </div>
            <div className="prompt-field">
              <CustomField
                control={form.control}
                name="multiple"
                formLabel="Multiple items"
                className="w-full"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                    <FormControl>
                      <Checkbox
                        defaultChecked={field.value}
                        onCheckedChange={(checked) => onInputCheked(checked)}
                      />
                    </FormControl>
                    <div className="space-y-1 leading-none">
                      <FormLabel>Detect multiple items</FormLabel>
                      <FormDescription>
                        Use it if you want to detect multiple items
                      </FormDescription>
                    </div>
                  </FormItem>
                )}
              />
              {type === "remove" && (
                <CustomField
                  control={form.control}
                  name="removeShadow"
                  formLabel="Remove shadows"
                  className="w-full"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow">
                      <FormControl>
                        <Checkbox
                          checked={field.checked}
                          onCheckedChange={(checked) => onShadowsInput(checked)}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>Remove shadows</FormLabel>
                        <FormDescription>
                          Use it if you want to remove shadows of objects
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />
              )}
            </div>
          </>
        )}
        <div className="flex">
          <p className="italic font-semibold text-primary/30 text-xs">
            Note: The underlying AI technology behind these features is still
            experimental, the quality of results may vary.
          </p>
        </div>

        <div className="media-uploader-field">
          <CustomField
            control={form.control}
            name="publicId"
            className="flex size-full flex-col"
            render={({ field }) => (
              <MediaUploader
                onValueChange={field.onChange}
                setImage={setImage}
                publicId={field.value}
                image={image}
                type={type}
              />
            )}
          />

          <TransformedImage
            image={image}
            type={type}
            title={form.getValues().title}
            isTransforming={isTransforming}
            setIsTransforming={setIsTransforming}
            transformationConfig={transformationConfig}
          />
        </div>

        <div className="flex flex-col gap-4">
          {action === "Add" && (
            <Button
              type="button"
              className="submit-button capitalize"
              disabled={
                isTransforming ||
                newTransformation === null ||
                !form.getValues().title ||
                (type === "fill" && !form.getValues().aspectRatio) ||
                (type === "remove" && !form.getValues().prompt) ||
                !image?.publicId ||
                creditBalance <= 0
              }
              onClick={onTransformHandler}
            >
              {isTransforming ? "Transforming..." : "Apply Transformation"}
            </Button>
          )}
          {action === "Update" && type !== "fill" && (
            <Button
              type="button"
              className="submit-button capitalize"
              disabled={
                isTransforming ||
                newTransformation === null ||
                !form.getValues().title ||
                (type === "remove" && !form.getValues().prompt) ||
                !image?.publicId ||
                creditBalance <= 0
              }
              onClick={onTransformHandler}
            >
              {isTransforming ? "Transforming..." : "Apply Transformation"}
            </Button>
          )}
          <Button
            type="submit"
            className="submit-button capitalize"
            disabled={isSubmitting || creditBalance <= 0}
          >
            {isSubmitting ? "Submitting..." : "Save Image"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default TransformationForm;
