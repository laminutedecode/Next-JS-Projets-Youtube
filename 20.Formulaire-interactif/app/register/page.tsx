import MultiStepForm from '../components/MultiStepForm'

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto">
        <h1 className="text-3xl font-bold text-center mb-8">Inscription</h1>
        <MultiStepForm />
      </div>
    </div>
  )
} 