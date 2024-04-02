import { createUploadthing } from "uploadthing/next";
import { auth, currentUser } from "@clerk/nextjs";

const f = createUploadthing();

export const ourFileRouter = {
  pdffile: f({ pdf: { maxFileSize: "1024GB", maxFileCount: 1 } })
    .middleware(async () => {
      const { id } = await currentUser();

      if (!id) {
        throw new Error("unAuthorized");
      }

      return { userId: id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  testfile: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { id } = await currentUser();

      if (!id) {
        throw new Error("unAuthorized");
      }

      return { userId: id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),

  assignment: f({ pdf: { maxFileSize: "16MB", maxFileCount: 1 } })
    .middleware(async () => {
      const { id } = await currentUser();

      if (!id) {
        throw new Error("unAuthorized");
      }

      return { userId: id };
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log(file.url);
    }),
};
