import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useMutation } from "@tanstack/react-query";

import { authService } from "../../../app/services/authService";
import { SignupParams } from "../../../app/services/authService/signup";
import toast from "react-hot-toast";

const schema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  email: z.string().min(1, "Email é obrigatório").email("Email inválido"),
  password: z.string().min(8, "Senha dseve ter no mínimo 8 dígitos"),
});

type formData = z.infer<typeof schema>;

export function useRegisterController() {
  const {
    register,
    formState: { errors },
    handleSubmit: hookFormHandleSubmit,
  } = useForm<formData>({
    resolver: zodResolver(schema),
  });

  const { mutateAsync, isPending } = useMutation({
    mutationKey: ["signup"],
    mutationFn: async (data: SignupParams) => {
      return await authService.signup(data);
    },
  });

  const handleSubmit = hookFormHandleSubmit(async (data) => {
    try {
      const { accessToken } = await mutateAsync(data);

      console.log(accessToken);
    } catch {
      toast.error("Ocorreu um erro ao criar o seu usuário!");
    }
  });

  return { handleSubmit, register, errors, isPending };
}
