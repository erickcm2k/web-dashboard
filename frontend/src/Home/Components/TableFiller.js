import React, { useEffect, useState } from "react";
import axios from "axios";
import DataTable from "./DataTable";
import {
  Button,
  Skeleton,
  Stack,
  useToast,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Alert,
  AlertIcon,
} from "@chakra-ui/react";
import useInterval from "../../Hooks/useInterval";
// Se debería hacer una petición al servidor con cada click o cada
// intervalor de 10 / 15 minutos.

const TableFiller = ({ mode }) => {
  // Declaración de variables
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstDate, setFirstDate] = useState("");
  const [secondDate, setSecondDate] = useState("");
  const [firstHour, setFirstHour] = useState("01:00");
  const [secondHour, setSecondHour] = useState("23:59");
  const [error, setError] = useState(false);
  const [timeToFetch, setTimeToFetch] = useState(1000 * 60 * 10);

  // Funciones para mostrar el modal.
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Handlers
  const handleFirstDateChange = (e) => {
    setFirstDate(e.target.value);
  };
  const handleSecondDateChange = (e) => {
    setSecondDate(e.target.value);
  };

  const handleFirstHourChange = (e) => {
    setFirstHour(e.target.value);
  };
  const handleSecondHourChange = (e) => {
    setSecondHour(e.target.value);
  };

  // Ejecutar la petición al montar el componente y al modificar el modo.
  useEffect(() => {
    initialFetch();
  }, []);


  // Ejecución de la petición inicial al montar y modificar el modo.
  const initialFetch = async () => {
    let url = "";

    if (mode === "CPU y memoria") {
      url = "http://192.168.0.4:3000/cpumem/";
    } else {
      url = "http://192.168.0.4:3000/disk/";
    }
    setError(false);
    setIsLoading(true);
    await axios
      .get(url)
      .then((result) => setData(result.data))
      .catch(() => {
        setData([]);
        setError(true);
      });
    setIsLoading(false);
  };

  // Consulta personalizada.
  const customFetch = async () => {
    // Validaciones para fechas.
    let url = "";

    if (firstDate.length === 0 || secondDate.length === 0) {
      toast({
        title: "Error",
        description: "Se deben seleccionar dos fechas.",
        status: "warning",
        duration: 7000,
        isClosable: true,
      });
      return;
    }
    console.log(mode);
    // Validaciones para hora (en caso de incluir).
    if (firstHour !== "01:00" || secondHour !== "23:59") {
      if (firstHour === secondHour) {
        toast({
          title: "Error",
          description: "Las horas deben ser distintas.",
          status: "warning",
          duration: 7000,
          isClosable: true,
        });
        return;
      }

      if (mode === "CPU y memoria") {
        url = `http://192.168.0.4:3000/cpumem/interval/?initialDate=${firstDate}&finalDate=${secondDate}&initialHour=${firstHour}&finalHour=${secondHour}`;
      } else {
        url = `http://192.168.0.4:3000/disk/interval/?initialDate=${firstDate}&finalDate=${secondDate}&initialHour=${firstHour}&finalHour=${secondHour}`;
      }
    } else {
      if (mode === "CPU y memoria") {
        url = `http://192.168.0.4:3000/cpumem/interval/?initialDate=${firstDate}&finalDate=${secondDate}`;
      } else {
        url = `http://192.168.0.4:3000/disk/interval/?initialDate=${firstDate}&finalDate=${secondDate}`;
      }
    }
    console.log(url);
    setIsLoading(true);
    await axios
      .get(url)
      .then((result) => setData(result.data))
      .catch(() => setData([]));

    setIsLoading(false);
  };

  // Aquí se harán las nuevas peticiones cada x minutos.
  useInterval(() => {
    setTimeToFetch(1000 * 60 * 10);
    initialFetch();
  }, 1000 * 60 * 10); // Medido en milisegundos. El tercer valor representa los minutos.

  // Para mostrar el tiempo restante para solicitar nuevos datos
  useInterval(() => {
    setTimeToFetch(timeToFetch - 1000);
  }, 1000);

  const restartDate = () => {
    setFirstDate("");
    setSecondDate("");
  };
  const restartHour = () => {
    setFirstHour("01:00");
    setSecondHour("23:59");
  };

  return (
    <>
      {!isLoading ? (
        <Stack>
          <Text>
            Últimas lecturas en{" "}
            <strong>
              {`0${new Date(timeToFetch).getMinutes()}`.slice(-2)}:
              {`0${new Date(timeToFetch).getSeconds()}`.slice(-2)}
            </strong>
          </Text>
          <Button margin="0 auto" onClick={onOpen}>
            Consulta personalizada
          </Button>
          <Modal isOpen={isOpen} onClose={onClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Consulta personalizada</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack spacing="1rem">
                  <Text>Fecha</Text>
                  <input
                    style={{ color: "black" }}
                    onChange={handleFirstDateChange}
                    type="date"
                    value={firstDate}
                  ></input>
                  <input
                    style={{ color: "black" }}
                    onChange={handleSecondDateChange}
                    type="date"
                    value={secondDate}
                  ></input>
                  <Button
                    onClick={restartDate}
                    colorScheme="red"
                    variant="ghost"
                  >
                    Fecha por defecto
                  </Button>
                  <Text>Hora (opcional)</Text>
                  <input
                    style={{ color: "black" }}
                    onChange={handleFirstHourChange}
                    type="time"
                    value={firstHour}
                  ></input>
                  <input
                    style={{ color: "black" }}
                    onChange={handleSecondHourChange}
                    type="time"
                    value={secondHour}
                  ></input>
                  <Button
                    onClick={restartHour}
                    colorScheme="red"
                    variant="ghost"
                  >
                    Hora por defecto
                  </Button>
                  <Button onClick={customFetch} colorScheme="teal">
                    Obtener con nuevas fechas
                  </Button>
                </Stack>
              </ModalBody>

              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={onClose}>
                  Cerrar
                </Button>
              </ModalFooter>
            </ModalContent>
          </Modal>

          {data.length === 0 ? (
            <Stack pt="5">
              <Alert status={error ? "error" : "warning"}>
                <AlertIcon />
                {error
                  ? "Error de conexión con el servidor."
                  : "No hay información disponible para el periodo seleccionado."}
              </Alert>
            </Stack>
          ) : (
            <DataTable data={data} mode={mode} />
          )}
        </Stack>
      ) : (
        <Stack>
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
          <Skeleton height="30px" />
        </Stack>
      )}
    </>
  );
};

export default TableFiller;
