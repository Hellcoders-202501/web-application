import CustomDialog from "@components/molecules/Dialog";

const FrequentQuestionsDialog = ({
  show = false,
  onClose,
}: {
  show: boolean;
  onClose: VoidFunction;
}) => {
  return (
    <CustomDialog open={show} onClose={onClose}>
      <p className="text-2xl font-bold mb-10 text-center">
        Preguntas frecuentes
      </p>
      <div className="flex flex-col gap-5 items-center max-w-xl w-full">
        <div>
          <p className="font-bold">¿Cómo cancelo un viaje en FastPorte?</p>
          <p className="text-sm">
            Solo puedes cancelar desde “Mis Servicios” → “Pendientes” antes de
            que comience el viaje. Si el viaje ya ha comenzado no podrás
            cancelarlo.
          </p>
        </div>
        <div>
          <p className="font-bold">¿Cómo puedo ver los detalles de un viaje?</p>
          <p className="text-sm">
            En “Contratos” en el ícono de la esquina superior derecha.
          </p>
        </div>
        <div>
          <p className="font-bold">¿Cómo puedo informar de un problema?</p>
          <p className="text-sm">
            Puedes enviar un mensaje a fastporte@gmail.com o comunicarte en
            Whatsapp. También puedes enviar un mensaje desde nuestra página web.
          </p>
        </div>
        <div>
          <p className="font-bold">¿Es posible comunicarse con un conductor?</p>
          <p className="text-sm">
            La aplicación no ofrece la posibilidad de comunicarse con un
            conductor por el momento. Sin embargo, puedes enviarle un mensaje al
            número de teléfono que aparece en su perfil.
          </p>
        </div>
        <div>
          <p className="font-bold">
            ¿Luego de completar un viaje, cuánto demora en llegar mi pago?
          </p>
          <p className="text-sm">
            El pago se mantiene retenido hasta que el conductor llegué al lugar
            de destino. Si el conductor no llega en el plazo establecido, el
            pago se devolverá automáticamente.
          </p>
        </div>
      </div>
    </CustomDialog>
  );
};

export default FrequentQuestionsDialog;
