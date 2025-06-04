<script setup lang="ts">
import { z } from "zod";
import { useIdentityMarixNewMutation } from "@/features/identityMatrix/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { Field, useForm } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import {
  FileUpload,
  FileUploadItem,
  FileUploadDropZone,
  FileUploadTrigger,
  FileUploadHiddenInput,
  FileUploadItemImagePreview,
} from "@/components/ui/file-upload";
import { AvatarImage, AvatarRoot, AvatarFallback } from "radix-vue";
import { PLACEHOLDER_AVATAR } from "@/utils/images";
import EditIcon from "@/assets/icons/edit.svg?component";
import { useRouter } from "vue-router";
import { useToast } from "@/components/ui/toast/use-toast";

const router = useRouter();
const { t } = useI18n();
const { toast } = useToast();

// Banner image of the identity matrix no optional
const { handleSubmit, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      name: z.string().min(1).max(255),
      description: z.string().min(6).max(500),
      banner: z
        .instanceof(File, { message: "The banner is required" })
        .refine((file) => file.size < 4 * 1024 * 1024, {
          message: "The image is too large, max size is 4 MB",
        })
        .refine((file) => file.type.startsWith("image/"), {
          message: "The file must be an image",
        }),
    })
  ),
  validateOnMount: false,
});

const {
  mutate: createIdentityMatrix,
  isPending,
  error,
} = useIdentityMarixNewMutation();

const onSubmit = handleSubmit((values) => {
  createIdentityMatrix(values, {
    onSuccess: () => {
      setTimeout(() => {
        router.push("/user/matrix");
      }, 5000);
      toast({
        title: t("common.successCreate"),
        variant: "success",
        duration: 2000,
      });
    },
  });
});
</script>

<template>
  <form @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-6 flex-1">
      <!-- Banner Field -->
      <Field
        name="banner"
        class="flex shrink-0 flex-col gap-4 max-w-[400px]"
        v-slot="{ field, errors }"
      >
        <FileUpload
          v-slot="{ file }"
          :model-value="field.value ? [field.value] : []"
          @update:model-value="
            (files) => field['onUpdate:modelValue']?.(files[0])
          "
        >
          <FileUploadDropZone as-child>
            <FileUploadTrigger
              class="group relative flex size-24 shrink-0 overflow-hidden rounded-full shadow-lg"
            >
              <div
                class="absolute left-0 right-0 flex h-full items-center justify-center rounded-3xl bg-black/50 opacity-0 ring-1 ring-inset ring-white/5 backdrop-blur-sm transition-opacity duration-100 ease-out group-hover:opacity-100 group-data-[drag-over=true]:opacity-100"
              >
                <EditIcon aria-hidden class="size-8 text-white/75" />
              </div>
              <AvatarRoot class="block size-full shrink-0 select-none">
                <FileUploadItem
                  v-if="file"
                  :file="file"
                  as="div"
                  class="size-full"
                >
                  <FileUploadItemImagePreview v-slot="{ url }">
                    <AvatarImage
                      v-if="url"
                      :src="url"
                      height="128"
                      width="128"
                      class="size-full object-cover"
                    />
                  </FileUploadItemImagePreview>
                </FileUploadItem>
                <AvatarImage
                  v-else
                  height="128"
                  width="128"
                  class="size-full object-cover"
                  :src="PLACEHOLDER_AVATAR"
                />
                <AvatarFallback
                  class="block size-full animate-pulse bg-zinc-200"
                />
              </AvatarRoot>
            </FileUploadTrigger>
          </FileUploadDropZone>
          <FileUploadHiddenInput accept="image/*" />
        </FileUpload>

        <!-- Error message for banner -->
        <span v-if="errors.length" class="text-xs text-red-500">{{
          errors[0]
        }}</span>
      </Field>

      <!-- Name Field -->
      <TextField
        name="name"
        :label="t('app.identityMatrix.title')"
        type="text"
        :placeholder="t('app.identityMatrix.namePlaceholder')"
        autocomplete="email"
      />

      <!-- Description Field -->
      <TextArea
        name="description"
        :label="t('app.identityMatrix.description')"
        type="text"
        :placeholder="t('app.identityMatrix.descriptionPlaceholder')"
        autocomplete="off"
      />

      <!-- Global Error -->
      <span v-if="error" class="text-red-500">{{ error }}</span>

      <!-- Submit Button -->
      <Button
        type="submit"
        :disabled="isPending"
        variant="primary"
        class="mt-6 flex h-11 w-full items-center justify-center rounded-full px-5 font-medium text-white transition-colors disabled:cursor-not-allowed disabled:opacity-50"
      >
        <LoaderIcon
          class="mr-2 size-5 animate-spin stroke-[1.5] text-white"
          v-if="isPending"
        />
        {{
          isPending
            ? t("app.identityMatrix.creating")
            : t("app.identityMatrix.create")
        }}
      </Button>
      <Toaster />
    </div>
  </form>
</template>
