import type { ComputedRef, MaybeRef } from 'vue'
export type LayoutKey = "sc" | "sc2" | "sqet" | "sqsq" | "web"
declare module "../../../../node_modules/.pnpm/nuxt@3.12.2_@opentelemetry+api@1.9.0_@parcel+watcher@2.4.1_@types+node@20.14.9_encoding@0.1.1_uylnhjfsm4b52y634edwamexvi/node_modules/nuxt/dist/pages/runtime/composables" {
  interface PageMeta {
    layout?: MaybeRef<LayoutKey | false> | ComputedRef<LayoutKey | false>
  }
}