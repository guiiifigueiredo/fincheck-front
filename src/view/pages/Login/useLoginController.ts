import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { authService } from "../../../app/services/authService";
import { useMutation } from "@tanstack/react-query";
import { SigninParams } from "../../../app/services/authService/signin";
import toast from "react-hot-toast";

const schema = z.object({
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(8, "Senha dseve ter no mínimo 8 dígitos"),
});

type FormData = z.infer<typeof schema>;

export function useLoginController() {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SigninParams) => {
      return await authService.signin(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      console.log(accessToken);
    } catch {
      toast.error("Ocorreu um erro ao fazer o login!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
