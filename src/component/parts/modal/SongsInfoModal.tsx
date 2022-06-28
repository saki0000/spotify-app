import { Modal, Center, Table } from "@mantine/core";
import React from "react";

const SongsInfoModal = ({ opened, setOpened, featureRow }: any) => {
  return (
    <div>
      <Modal
        opened={opened}
        onClose={() => setOpened(false)}
        title=""
        size="lg"
      >
        <Center>
          <Table striped highlightOnHover>
            <thead>
              <tr>
                <th>Feature</th>
                <th>Value</th>
              </tr>
            </thead>
            <tbody>{featureRow}</tbody>
          </Table>
        </Center>
      </Modal>
    </div>
  );
};

export default SongsInfoModal;
