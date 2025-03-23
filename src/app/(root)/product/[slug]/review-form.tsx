"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { reviewFormDefaultValues } from "@/lib/constants";
import { insertReviewSchema } from "@/lib/validators";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader2Icon, PencilIcon, StarIcon } from "lucide-react";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import {
  createUpdateReview,
  getReviewByProductId,
} from "@/lib/actions/review.action";

type CustomerReview = z.infer<typeof insertReviewSchema>;

const ReviewForm = ({
  userId,
  productId,
  onReviewSubmitted,
}: {
  userId: string;
  productId: string;
  onReviewSubmitted: () => void;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm<CustomerReview>({
    resolver: zodResolver(insertReviewSchema),
    defaultValues: reviewFormDefaultValues,
  });

  const handleOpenForm = async () => {
    form.setValue("productId", productId);
    form.setValue("userId", userId);

    const review = await getReviewByProductId({ productId });
    if (review) {
      form.setValue("title", review.title);
      form.setValue("description", review.description);
      form.setValue("rating", review.rating);
    }

    setOpen(true);
  };

  const onSubmit: SubmitHandler<z.infer<typeof insertReviewSchema>> = async (
    values
  ) => {
    const res = await createUpdateReview({ ...values, productId });

    if (res.success) {
      toast.error(res.message);
    }

    setOpen(false);

    onReviewSubmitted();

    toast.success(res.message);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <Button
        onClick={handleOpenForm}
        variant="default"
        className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-4 py-2 rounded-lg shadow-md transition-all duration-200"
      >
        <PencilIcon className="h-4 w-4" />
        Write a review
      </Button>
      <DialogContent className="sm:max-w-[450px] p-0 rounded-xl overflow-hidden border-0 shadow-xl">
        <div className="bg-gradient-to-r from-blue-100 to-indigo-50 p-6">
          <DialogHeader className="pb-2">
            <DialogTitle className="text-2xl font-bold text-gray-800">
              Write a review
            </DialogTitle>
            <DialogDescription className="text-gray-600">
              Share your experience with other customers
            </DialogDescription>
          </DialogHeader>
        </div>

        <Form {...form}>
          <form
            method="post"
            className="px-6 py-4"
            onSubmit={form.handleSubmit(onSubmit)}
          >
            <div className="grid gap-5">
              <FormField
                control={form.control}
                name="rating"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-700">
                      Rating
                    </FormLabel>
                    <div className="flex justify-center py-2">
                      <Select
                        onValueChange={field.onChange}
                        value={field.value.toString()}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full bg-white border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                            <SelectValue placeholder="Select your rating" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent className="bg-white rounded-lg shadow-lg">
                          {Array.from({ length: 5 }).map((_, index) => (
                            <SelectItem
                              key={index}
                              value={(index + 1).toString()}
                              className="focus:bg-blue-50 cursor-pointer"
                            >
                              <div className="flex items-center gap-2">
                                <span className="font-medium">{index + 1}</span>
                                {Array.from({ length: index + 1 }).map(
                                  (_, i) => (
                                    <StarIcon
                                      key={i}
                                      className="h-4 w-4 text-amber-400 fill-current"
                                    />
                                  )
                                )}
                                {Array.from({ length: 5 - (index + 1) }).map(
                                  (_, i) => (
                                    <StarIcon
                                      key={i}
                                      className="h-4 w-4 text-gray-300"
                                    />
                                  )
                                )}
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-700">
                      Review Title
                    </FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Summarize your experience"
                        {...field}
                        className="w-full border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem className="space-y-2">
                    <FormLabel className="font-medium text-gray-700">
                      Your Review
                    </FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="What did you like or dislike? What did you use this product for?"
                        {...field}
                        className="w-full min-h-[120px] border border-gray-200 rounded-lg px-3 py-2 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </FormControl>
                    <FormMessage className="text-red-500 text-xs" />
                  </FormItem>
                )}
              />
            </div>

            <DialogFooter className="mt-6 gap-3 flex-col sm:flex-row">
              <Button
                type="button"
                variant="outline"
                size="lg"
                onClick={() => setOpen(false)}
                className="w-full sm:w-auto border border-gray-300 text-gray-700 hover:bg-gray-50 rounded-lg font-medium"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                size="lg"
                className="w-full sm:w-auto bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 text-white font-medium px-6 py-2 rounded-lg shadow-md transition-all duration-200 flex items-center justify-center gap-2"
                disabled={form.formState.isSubmitting}
              >
                {form.formState.isSubmitting ? (
                  <>
                    <Loader2Icon className="h-4 w-4 animate-spin" />
                    Submitting...
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4" />
                    Submit Review
                  </>
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ReviewForm;
