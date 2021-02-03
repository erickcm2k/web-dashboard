import React, { useState } from "react";
import {
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { UpDownIcon, WarningTwoIcon, WarningIcon } from "@chakra-ui/icons";
import { v4 as uuidv4 } from "uuid";
const DataTable = ({ data, mode }) => {
  React.useEffect(() => {}, [data, mode]);

  const [tableData, setTableData] = useState(data);

  function keySort(key) {
    let sortOrder = 1;
    if (key[0] === "-") {
      sortOrder = -1;
      key = key.substr(1);
    }
    return function (a, b) {
      let x = a[key];
      let y = b[key];

      if (!isNaN(x) && !isNaN(y)) {
        x = parseFloat(x);
        y = parseFloat(y);
      }

      let result = x < y ? -1 : x > y ? 1 : 0;

      return result * sortOrder;
    };
  }

  const sortByKey = (key) => {
    const temp = [...tableData];
    temp.sort(keySort(key));
    setTableData([...temp]);
  };

  const setBGColor = (value) => {
    if (value > 90) {
      return "red.500";
    }

    if (value > 80 && value <= 90) {
      return "yellow.300";
    }
  };

  const setIcon = (value) => {
    if (value > 90) {
      return <WarningIcon />;
    }

    if (value > 80 && value <= 90) {
      return <WarningTwoIcon />;
    }
  };
  return (
    <>
      {mode === "CPU y memoria" ? (
        <Box p="2" m="2">
          <Table size="sm" border="3px solid teal">
            <Thead>
              <Tr>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("Servidor")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-Servidor")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("PorcUsoCPU")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-PorcUsoCPU")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("PorcUsoMemoria")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-PorcUsoMemoria")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("FechaMonitoreo")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-FechaMonitoreo")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
              </Tr>
            </Thead>
            <Thead>
              <Tr>
                <Th>Servidor</Th>
                <Th>Uso CPU</Th>
                <Th>Uso memoria</Th>
                <Th>Fecha monitoreo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((e) => (
                <Tr key={uuidv4()}>
                  <Td>{e.Servidor}</Td>
                  <Td color={setBGColor(e.PorcUsoCPU)}>
                    {e.PorcUsoCPU}
                    {`% `}
                    {setIcon(e.PorcUsoCPU)}
                  </Td>
                  <Td>{e.PorcUsoMemoria}%</Td>
                  <Td>{e.FechaMonitoreo}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      ) : (
        <Box p="2" m="2">
          <Table size="sm" border="3px solid teal">
            <Thead>
              <Tr>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("Servidor")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-Servidor")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("Unidad")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-Unidad")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("Etiqueta")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-Etiqueta")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("CapacidadTotal")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-CapacidadTotal")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>

                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("CapacidadUso")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-CapacidadUso")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("CapacidadLibre")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-CapacidadLibre")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("PorcLibre")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-PorcLibre")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
                <Th>
                  <Menu>
                    <MenuButton
                      as={Button}
                      rightIcon={<UpDownIcon />}
                    ></MenuButton>
                    <MenuList>
                      <MenuItem onClick={() => sortByKey("FechaMonitoreo")}>
                        Ascendente
                      </MenuItem>
                      <MenuItem onClick={() => sortByKey("-FechaMonitoreo")}>
                        Descendente
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </Th>
              </Tr>
            </Thead>
            <Thead>
              <Tr>
                <Th>Servidor</Th>
                <Th>Unidad</Th>
                <Th>Etiqueta</Th>
                <Th>Capacidad total</Th>
                <Th>Capacidad uso</Th>
                <Th>Capacidad libre</Th>
                <Th>Porcentaje Libre</Th>
                <Th>Fecha monitoreo</Th>
              </Tr>
            </Thead>
            <Tbody>
              {tableData.map((e) => (
                <Tr key={uuidv4()}>
                  <Td>{e.Servidor}</Td>
                  <Td>{e.Unidad}</Td>
                  <Td>{e.Etiqueta}</Td>
                  <Td>{e.CapacidadTotal}</Td>
                  <Td color={setBGColor(e.CapacidadUso)}>
                    {e.CapacidadUso}
                    {`% `}
                    {setIcon(e.CapacidadUso)}
                  </Td>
                  <Td>{e.CapacidadLibre}</Td>
                  <Td>{e.PorcLibre}</Td>
                  <Td>{e.FechaMonitoreo}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>
      )}
    </>
  );
};

export default DataTable;
