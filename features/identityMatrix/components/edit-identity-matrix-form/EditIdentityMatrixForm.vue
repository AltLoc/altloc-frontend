<script setup lang="ts">
import { z } from "zod";
import {
  useIdentityMarixNewMutation,
  getIdentityMatrixQuery,
} from "@/features/identityMatrix/service/index";
import { Button } from "@/components/ui/button";
import LoaderIcon from "@/assets/icons/loader.svg?component";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm, Field } from "vee-validate";
import { useI18n } from "vue-i18n";
import { TextArea } from "@/components/ui/text-area/";
import { useQuery, useQueryClient } from "@tanstack/vue-query";
import type { IdentityMatrix } from "@/features/identityMatrix/model";
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
import { useToast } from "@/components/ui/toast/use-toast";

const { t } = useI18n();
const { toast } = useToast();

const props = defineProps<{ identityMatrix: IdentityMatrix }>();

const IdentityMatrixSchema = z.object({
  name: z.string().min(6).max(32),
  description: z.string().min(6).max(255),
  banner: z
    .instanceof(File)
    .refine((file) => file.size < 4 * 1024 * 1024, {
      message: "The image is too large, max size is 4 MB",
    })
    .refine((file) => file.type.startsWith("image/"), {
      message: "The file must be an image",
    })
    .optional(),
  bannerKey: z.string().optional(),
});

const { handleSubmit, meta, setFieldError, resetForm } = useForm({
  validationSchema: toTypedSchema(IdentityMatrixSchema),
  validateOnMount: false,
});

const queryClient = useQueryClient();
queryClient.setQueryData(
  getIdentityMatrixQuery(props.identityMatrix.id).queryKey,
  props.identityMatrix
);
const { data: identityMatrix } = useQuery(
  getIdentityMatrixQuery(props.identityMatrix.id)
);

watch(
  identityMatrix,
  () => {
    if (!identityMatrix.value) return;
    resetForm({
      values: {
        name: identityMatrix.value.name,
        description: identityMatrix.value.description,
        bannerKey: identityMatrix.value.bannerKey,
      },
    });
  },
  {
    immediate: true,
  }
);

const {
  mutate: updateIdentityMatrix,
  isPending,
  error,
} = useIdentityMarixNewMutation();

const onSubmit = handleSubmit((values) => {
  const { ...rest } = values;
  updateIdentityMatrix(
    {
      id: props.identityMatrix.id,
      ...rest,
    },
    {
      onSuccess: () => {
        toast({
          title: t("common.successUpdate"),
          variant: "success",
          duration: 2000,
        });
      },
    }
  );
});
</script>

<template>
  <form v-if="identityMatrix" @submit.prevent="onSubmit" class="w-full">
    <div class="flex flex-col gap-4">
      <Field
        name="banner"
        class="l flex shrink-0 flex-col gap-6"
        v-slot="{ field }"
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
                  :src="
                    identityMatrix?.bannerKey
                      ? getCDNImageURL(identityMatrix.bannerKey)
                      : PLACEHOLDER_AVATAR
                  "
                />
                <AvatarFallback
                  class="block size-full animate-pulse bg-zinc-200"
                />
              </AvatarRoot>
            </FileUploadTrigger>
          </FileUploadDropZone>
          <FileUploadHiddenInput accept="image/*" />
        </FileUpload>
      </Field>
      <TextField
        name="name"
        :label="t('app.identityMatrix.title')"
        type="text"
        placeholder="I identify myself as a businessman."
        autocomplete="email"
      />

      <TextArea
        name="description"
        :label="t('app.identityMatrix.description')"
        type="text"
        placeholder="Short description of your identity matrix."
        autocomplete="off"
      />

      <span v-if="error" class="text-red-500">{{ error }}</span>
    </div>
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
          ? t("app.identityMatrix.editing")
          : t("app.identityMatrix.edit")
      }}
    </Button>
    <Toaster />
  </form>
</template>
