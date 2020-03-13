import React, {Component} from "react";
import { Page, Text, Image, View, Document, StyleSheet} from '@react-pdf/renderer';

class PdfDocumentCustom extends Component {
    render() {
      const styles = StyleSheet.create({
        page: {
          flexDirection: "column"
        },
        image: {
          width: "80%",
          marginBottom: 30,
        },
        centerImage: {
          alignItems: "center",
          flex: 1
        },
        title: {
          marginTop: 30,
          marginBottom: 40,
        }
      });

      let {image1, image2, title} = this.props;
      return (
        <Document>
          <Page style={styles.page} size="A4">
              <View style={styles.centerImage} >
                <Text style={styles.title} >{title}</Text>
                {image1 !== undefined && <Image style={styles.image} src={image1} />}
                {image2 !== undefined && <Image style={styles.image} src={image2} />}
              </View>
          </Page>
        </Document>
      )
    }
}

class TransportationOrderDocument extends Component {
  render() {
    const styles = StyleSheet.create({
      page: {
        flexDirection: "column"
      },
      image: {
        width: "80%",
        marginBottom: 30,
      },
      centerImage: {
        alignItems: "center",
        flex: 1,
      },
      backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
      },
      title: {
        marginTop: 30,
        marginBottom: 40,
      }
    });

    return (
      <Document>
        <Page style={styles.page} size="A4">
            <View style={styles.centerImage}>
              <Image source={require('../../image/transportation-order.jpg')} style={styles.backgroundImage} />
            </View>
        </Page>
      </Document>
    )
  }
}

export {
  PdfDocumentCustom,
  TransportationOrderDocument,
}

