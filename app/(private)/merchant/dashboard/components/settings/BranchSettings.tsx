// "use client";

// import React from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "sonner";
// import { Card } from "@/components/ui/card";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import { useI18n } from "@/components/provider/I18nProvider";
// import { useCreateBranchMutation } from "@/redux/features/merchant/settingApi";
// import { useRouter } from "next/navigation";
// import { useAppDispatch } from "@/redux/hooks";
// import { baseApi } from "@/redux/api/baseApi";
// import { useAllBranchQuery } from "@/redux/features/merchant/branchApi";

// interface BranchFormData {
//   name: string;
//   phone: string;
//   address: string;
// }

// export default function BranchSettings() {
//   const { t, locale } = useI18n();
//   const isRTL = locale === "ar";
//   const router = useRouter();
//   const dispatch = useAppDispatch();
//   const { data: branchData, isLoading: isBranchLoading } = useAllBranchQuery(
//     {},
//   );
//   const [createBranch, { isLoading }] = useCreateBranchMutation();

//   const form = useForm<BranchFormData>({
//     defaultValues: {
//       name: "",
//       phone: "",
//       address: "",
//     },
//   });

//   const onSubmit = async (data: BranchFormData) => {
//     try {
//       const response = await createBranch({
//         body: {
//           name: data.name,
//           phone: data.phone,
//           address: data.address,
//         },
//       }).unwrap();

//       //   console.log("response==", response);

//       toast.success(
//         locale == "ar" ? "تم إنشاء الفرع بنجاح" : "Branch Created successfully",
//       );
//       dispatch(baseApi.util.invalidateTags(["Branch", "Setting"]));
//       router.refresh();
//       form.reset();
//     } catch (error: any) {
//       // console.log(error);
//       toast.error(
//         error?.data?.message,
//         // locale == "ar" ? "فشل في إنشاء الفرع" : "Failed to Create branch",
//       );
//     }
//   };

//   return (
//     <div className="flex flex-col gap-8 p-6 w-full">
//       {/* Branch Settings Section */}
//       <Card className="rounded-xl p-8 border border-gray-200 dark:border-gray-700 dark:bg-gray-800 shadow-sm">
//         <h3 className="text-[18px] font-semibold">
//           {locale == "ar" ? "إنشاء فرع" : "Branch Create"}
//         </h3>

//         <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
//           {/* Branch Name */}
//           <div>
//             <label className="text-[14px] font-medium">
//               {locale == "ar" ? "اسم الفرع" : "Branch Name"}
//             </label>
//             <Input
//               type="text"
//               placeholder={
//                 locale == "ar" ? "أدخل اسم الفرع" : "Enter branch name"
//               }
//               {...form.register("name", {
//                 required: locale == "ar" ? "الاسم مطلوب" : "Name is required",
//               })}
//               className="w-full py-5 mt-2"
//             />
//             {form.formState.errors.name && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.name.message}
//               </p>
//             )}
//           </div>

//           {/* Branch Phone */}
//           <div>
//             <label className="text-[14px] font-medium">
//               {locale == "ar" ? "رقم الهاتف" : "Phone Number"}
//             </label>
//             <Input
//               type="text"
//               placeholder={
//                 locale == "ar" ? "أدخل رقم الهاتف" : "Enter phone number"
//               }
//               {...form.register("phone", {
//                 required:
//                   locale == "ar" ? "رقم الهاتف مطلوب" : "Phone is required",
//               })}
//               className="w-full py-5 mt-2"
//             />
//             {form.formState.errors.phone && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.phone.message}
//               </p>
//             )}
//           </div>

//           {/* Branch Address */}
//           <div>
//             <label className="text-[14px] font-medium">
//               {locale == "ar" ? "العنوان" : "Address"}
//             </label>
//             <Input
//               type="text"
//               placeholder={
//                 locale == "ar" ? "أدخل عنوان الفرع" : "Enter branch address"
//               }
//               {...form.register("address", {
//                 required:
//                   locale == "ar" ? "العنوان مطلوب" : "Address is required",
//               })}
//               className="w-full py-5 mt-2"
//             />
//             {form.formState.errors.address && (
//               <p className="text-red-500 text-sm mt-1">
//                 {form.formState.errors.address.message}
//               </p>
//             )}
//           </div>

//           {/* Submit */}
//           <div className="flex justify-end">
//             <Button
//               className="cursor-pointer"
//               type="submit"
//               disabled={isLoading}
//             >
//               {isLoading
//                 ? locale == "ar"
//                   ? "جاري الحفظ..."
//                   : "Saving..."
//                 : locale == "ar"
//                   ? "حفظ التغييرات"
//                   : "Save Changes"}
//             </Button>
//           </div>
//         </form>
//       </Card>
//     </div>
//   );
// }

"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/components/provider/I18nProvider";
import {
  useCreateBranchMutation,
  useUpdateBranchMutation,
  useDeleteBranchMutation,
} from "@/redux/features/merchant/settingApi";
import { useAllBranchQuery } from "@/redux/features/merchant/branchApi";
import { useAppDispatch } from "@/redux/hooks";
import { baseApi } from "@/redux/api/baseApi";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Edit, Trash2, Plus } from "lucide-react";

interface BranchFormData {
  id?: string;
  name: string;
  phone: string;
  address: string;
}

export default function BranchSettings() {
  const { locale } = useI18n();
  const dispatch = useAppDispatch();

  // States for Modals
  const [isOpen, setIsOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedBranch, setSelectedBranch] = useState<BranchFormData | null>(
    null,
  );

  // API Hooks
  const { data: branchData, isLoading: isBranchLoading } = useAllBranchQuery(
    {},
  );
  const [createBranch, { isLoading: isCreating }] = useCreateBranchMutation();
  const [updateBranch, { isLoading: isUpdating }] = useUpdateBranchMutation();
  const [deleteBranch, { isLoading: isDeleting }] = useDeleteBranchMutation();

  const form = useForm<BranchFormData>({
    defaultValues: { name: "", phone: "", address: "" },
  });

  const editForm = useForm<BranchFormData>();
  // --- Handlers ---
  const onCreateSubmit = async (data: BranchFormData) => {
    try {
      await createBranch({ body: data }).unwrap();
      toast.success(
        locale === "ar"
          ? "تم إنشاء الفرع بنجاح"
          : "Branch Created successfully",
      );
      closeAndRefresh();
      form.reset();
      setIsOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Error");
    }
  };

  const onUpdateSubmit = async (data: BranchFormData) => {
    try {
      await updateBranch({ id: selectedBranch?.id, body: data }).unwrap();
      toast.success(
        locale === "ar" ? "تم تحديث الفرع" : "Branch updated successfully",
      );
      closeAndRefresh();
      setIsEditOpen(false);
    } catch (error: any) {
      toast.error(error?.data?.message || "Error");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteBranch(selectedBranch?.id).unwrap();
      toast.success(locale === "ar" ? "تم الحذف" : "Deleted successfully");
      closeAndRefresh();
      setIsDeleteOpen(false);
    } catch (error: any) {
      toast.error("Failed to delete");
    }
  };

  const closeAndRefresh = () => {
    dispatch(baseApi.util.invalidateTags(["Branch", "Setting"]));
  };

  const openEditModal = (branch: any) => {
    setSelectedBranch(branch);
    editForm.reset({
      name: branch.name,
      phone: branch.phone,
      address: branch.address,
    });
    setIsEditOpen(true);
  };

  return (
    <div className="flex flex-col gap-8 p-6 w-full">
      {/* Header with Create Button */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {locale === "ar" ? "إعدادات الفروع" : "Branch Settings"}
        </h2>

        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button className="flex items-center gap-2">
              <Plus size={18} />
              {locale === "ar" ? "إنشاء فرع" : "Create Branch"}
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>
                {locale === "ar" ? "إضافة فرع جديد" : "Add New Branch"}
              </DialogTitle>
            </DialogHeader>
            <form
              onSubmit={form.handleSubmit(onCreateSubmit)}
              className="space-y-4"
            >
              <BranchFields
                register={form.register}
                errors={form.formState.errors}
                locale={locale}
              />
              <Button type="submit" className="w-full" disabled={isCreating}>
                {isCreating ? "..." : locale === "ar" ? "حفظ" : "Save"}
              </Button>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/* Branch Table */}
      <Card className="overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                {locale === "ar" ? "اسم الفرع" : "Branch Name"}
              </TableHead>
              <TableHead>{locale === "ar" ? "رقم الهاتف" : "Phone"}</TableHead>
              <TableHead>{locale === "ar" ? "الموقع" : "Location"}</TableHead>
              <TableHead className="text-right">
                {locale === "ar" ? "إجراءات" : "Actions"}
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {branchData?.data?.map((branch: any) => (
              <TableRow key={branch.id}>
                <TableCell className="font-medium">{branch.name}</TableCell>
                <TableCell>{branch.phone}</TableCell>
                <TableCell>{branch.address}</TableCell>
                <TableCell className="text-right flex justify-end gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => openEditModal(branch)}
                  >
                    <Edit size={18} className="text-blue-600" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setSelectedBranch(branch);
                      setIsDeleteOpen(true);
                    }}
                  >
                    <Trash2 size={18} className="text-red-600" />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>

      {/* Edit Modal */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "ar" ? "تعديل الفرع" : "Edit Branch"}
            </DialogTitle>
          </DialogHeader>
          <form
            onSubmit={editForm.handleSubmit(onUpdateSubmit)}
            className="space-y-4"
          >
            <BranchFields
              register={editForm.register}
              errors={editForm.formState.errors}
              locale={locale}
            />
            <Button type="submit" className="w-full" disabled={isUpdating}>
              {locale === "ar" ? "تحديث" : "Update"}
            </Button>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {locale === "ar" ? "هل أنت متأكد؟" : "Are you sure?"}
            </DialogTitle>
          </DialogHeader>
          <p>
            {locale === "ar"
              ? "سيتم حذف هذا الفرع نهائياً."
              : "This action cannot be undone."}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteOpen(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isDeleting}
            >
              {isDeleting ? "..." : locale === "ar" ? "حذف" : "Delete"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// Reusable fields component to keep code clean
function BranchFields({ register, errors, locale }: any) {
  return (
    <>
      <div>
        <label className="text-sm font-medium">
          {locale === "ar" ? "اسم الفرع" : "Branch Name"}
        </label>
        <Input {...register("name", { required: true })} className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium">
          {locale === "ar" ? "رقم الهاتف" : "Phone"}
        </label>
        <Input {...register("phone", { required: true })} className="mt-1" />
      </div>
      <div>
        <label className="text-sm font-medium">
          {locale === "ar" ? "العنوان" : "Address"}
        </label>
        <Input {...register("address", { required: true })} className="mt-1" />
      </div>
    </>
  );
}
