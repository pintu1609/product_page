import { useQuery,useMutation } from "@tanstack/react-query";
import axiosInstance from "@/service/axiosInstance";
import ENDPOINTS from "@/service/endpoint";
import { z } from "zod";

interface FetchProductParams {
  // category?: string;
}

const productSchema = z.array(
  z.object({
    id: z.number(),
    title: z.string(),
    price: z.number(),
    description: z.string(),
    category: z.string(),
    image: z.string().url(),
    rating: z.object({
      rate: z.number(),
      count: z.number(),
    }),
  })
);
const fetchProduct = async (params:FetchProductParams) => {
    const { data } = await axiosInstance({
      method: "get",
      url: ENDPOINTS.Product,
      headers: { "Content-Type": "application/json" },
    });
    return productSchema.parse(data); // Validate with Zod

    
  };
  
  
  const useProduct= () => {
    return useQuery({
      queryKey: ["useProduct"],
      queryFn: () => fetchProduct({}),
    });
  };
  export { 
    useProduct,
  }