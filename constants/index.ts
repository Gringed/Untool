import { Plan } from "@prisma/client";

export const navLinks = [
  {
    label: "Home",
    route: "/dashboard",
    icon: `https://www.svgrepo.com/show/413674/home.svg`,
  },
  {
    label: "Image Restore",
    route: "/transformations/add/restore",
    icon: "https://www.svgrepo.com/show/413687/paint.svg",
  },
  {
    label: "Generative Fill",
    route: "/transformations/add/fill",
    icon: "https://www.svgrepo.com/show/413666/fill.svg",
  },
  {
    label: "Object Remove",
    route: "/transformations/add/remove",
    icon: "https://www.svgrepo.com/show/413743/watch.svg",
  },
  {
    label: "Object Recolor",
    route: "/transformations/add/recolor",
    icon: "https://www.svgrepo.com/show/413653/create.svg",
  },
  {
    label: "Background Remove",
    route: "/transformations/add/removeBackground",
    icon: "https://www.svgrepo.com/show/413664/erase.svg",
  },
  {
    label: "Object Replace",
    route: "#",
    icon: "https://www.svgrepo.com/show/413651/copy.svg",
    plan: ["Pro Package", "Premium Package"],
  },
  {
    label: "Buy Credits",
    route: "/credits",
    icon: "/assets/icons/coins.svg",
  },
];

export const plans = [
  {
    _id: 1,
    planId: "FREE" as Plan,
    name: "Free",
    icon: "/assets/icons/free-plan.svg",
    price: 0,
    credits: 10,
    inclusions: [
      {
        label: "10 Free Credits",
        isIncluded: true,
      },
      {
        label: "Basic Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: false,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 2,
    planId: "PRO" as Plan,
    name: "Pro Package",
    icon: "/assets/icons/pro-plan.svg",
    price: 7,
    credits: 120,
    inclusions: [
      {
        label: "120 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: false,
      },
    ],
  },
  {
    _id: 3,
    planId: "PREMIUM" as Plan,
    name: "Premium Package",
    icon: "/assets/icons/premium_plan.svg",
    price: 40,
    credits: 700,
    inclusions: [
      {
        label: "700 Credits",
        isIncluded: true,
      },
      {
        label: "Full Access to Services",
        isIncluded: true,
      },
      {
        label: "Priority Customer Support",
        isIncluded: true,
      },
      {
        label: "Priority Updates",
        isIncluded: true,
      },
    ],
  },
];

export const transformationTypes = {
  restore: {
    type: "restore",
    title: "Restore Image",
    subTitle: "Refine images by removing noise and imperfections",
    config: { restore: true },
    icon: "413687/paint.svg",
  },
  removeBackground: {
    type: "removeBackground",
    title: "Background Remove",
    subTitle: "Removes the background of the image using AI",
    config: { removeBackground: true },
    icon: "413664/erase.svg",
  },
  fill: {
    type: "fill",
    title: "Generative Fill",
    subTitle: "Enhance an image's dimensions using AI outpainting",
    config: { fillBackground: true },
    icon: "413666/fill.svg",
  },
  remove: {
    type: "remove",
    title: "Object Remove",
    subTitle: "Identify and eliminate objects from images",
    config: {
      remove: { prompt: "", removeShadow: true, multiple: true },
    },
    icon: "413743/watch.svg",
  },
  recolor: {
    type: "recolor",
    title: "Object Recolor",
    subTitle: "Identify and recolor objects from the image",
    config: {
      recolor: { prompt: "", to: "", multiple: true },
    },
    icon: "413653/create.svg",
  },
};

export const aspectRatioOptions = {
  "1:1": {
    aspectRatio: "1:1",
    label: "Square (1:1)",
    width: 1000,
    height: 1000,
  },
  "3:4": {
    aspectRatio: "3:4",
    label: "Standard Portrait (3:4)",
    width: 1000,
    height: 1334,
  },
  "9:16": {
    aspectRatio: "9:16",
    label: "Phone Portrait (9:16)",
    width: 1000,
    height: 1778,
  },
};

export const defaultValues = {
  title: "",
  aspectRatio: "",
  color: "",
  prompt: "",
  publicId: "",
};

export const creditFee = -1;
export const aplanId = "PLUS";
