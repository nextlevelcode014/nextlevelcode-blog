export default function MessageError({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-darkGray">
      <h1 className="text-3xl font-bold text-red-600">
        Erro ao Carregar Posts
      </h1>
      <p className="mt-4 text-lg text-gray-700">{message}</p>
      <p className="mt-2 text-sm text-gray-500">
        Tente atualizar a página ou volte mais tarde.
      </p>
    </div>
  )
}
