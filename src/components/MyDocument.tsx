import React from "react";
import { Page, Text, View, Document, StyleSheet, Image } from "@react-pdf/renderer";

interface IDocumentProps {
  name: string;
  picture: FileList;
}

const MyDocument: React.FC<IDocumentProps> = ({ name, picture }) => {
  const pictureUrl = picture && picture.length > 0 ? URL.createObjectURL(picture[0]) : null;

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.section}>
          <Text>{name}</Text>
        </View>
        <View style={styles.section}>{pictureUrl && <Image src={pictureUrl} />}</View>
      </Page>
    </Document>
  );
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

export default MyDocument;
