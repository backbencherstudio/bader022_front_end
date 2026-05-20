"use client";

import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
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
import PhoneInput from "react-phone-number-input";
// @ts-ignore
import "react-phone-number-input/style.css";

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
          <DialogContent className="dark:bg-gray-800">
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
                  control={form.control}
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
      <Card className="overflow-hidden  dark:bg-gray-800">
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
        <DialogContent className="dark:bg-gray-800">
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
              control={editForm.control}
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
        <DialogContent className="dark:bg-gray-800">
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
function BranchFields({ register, control, errors, locale }: any) {
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
        {control ? (
          <Controller
            name="phone"
            control={control}
            rules={{
              required: locale === "ar" ? "رقم الهاتف مطلوب" : "Phone number is required",
              validate: (value: any) => {
                const digits = value?.replace(/\D/g, "") || "";
                if (!digits.startsWith("966")) {
                  return locale === "ar" ? "يجب أن يبدأ رقم الهاتف ب +966" : "Phone number must start with +966";
                }
                if (digits.length !== 12) {
                  return locale === "ar" ? "يجب أن يحتوي رقم الهاتف على 966 و9 أرقام محلية)" : "Phone number must include +966 and 9 digits";
                }
                return true;
              },
            }}
            render={({ field }) => (
              <PhoneInput
                international
                defaultCountry="SA"
                countryCallingCodeEditable={false}
                value={field.value || ""}
                onChange={field.onChange}
                className={`w-full [&_input]:h-11 [&_input]:w-full [&_input]:rounded-md [&_input]:border [&_input]:border-gray-300 dark:[&_input]:border-gray-600 [&_input]:bg-white dark:[&_input]:bg-gray-800 [&_input]:px-3 [&_.PhoneInputCountry]:pointer-events-none [&_.PhoneInputCountry]:opacity-70 mt-1`}
              />
            )}
          />
        ) : (
          <Input {...register("phone", { required: true })} className="mt-1" />
        )}
        {errors?.phone && (
          <p className="text-red-500 text-sm mt-1">{errors.phone.message}</p>
        )}
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
