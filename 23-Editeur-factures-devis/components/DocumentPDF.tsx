
import { Document, Page, StyleSheet, Text, View } from '@react-pdf/renderer';
import { DocumentPDFProps } from '../types';


const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontSize: 12,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  companyInfo: {
    width: '40%',
  },
  clientInfo: {
    width: '40%',
    alignItems: 'flex-end',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  table: {
    marginTop: 20,
    marginBottom: 30,
  },
  tableHeader: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#000',
    paddingBottom: 5,
    fontWeight: 'bold',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 0.5,
    borderBottomColor: '#999',
    paddingVertical: 8,
  },
  description: { width: '40%' },
  quantity: { width: '15%', textAlign: 'center' },
  unitPrice: { width: '20%', textAlign: 'right' },
  total: { width: '25%', textAlign: 'right' },
  totals: {
    marginTop: 30,
    alignItems: 'flex-end',
  },
  totalRow: {
    flexDirection: 'row',
    marginVertical: 5,
  },
  totalLabel: {
    width: 100,
  },
  totalValue: {
    width: 100,
    textAlign: 'right',
  },
  footer: {
    position: 'absolute',
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: 'center',
    fontSize: 10,
    color: '#666',
  },
});

export default function DocumentPDF({ 
  type, 
  number, 
  date, 
  dueDate, 
  validUntil,
  company, 
  client, 
  items,
  totalHT,
  tva,
  totalTTC 
}: DocumentPDFProps) {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        {/* En-tête */}
        <View style={styles.header}>
          <View style={styles.companyInfo}>
           
            <Text>{company.name}</Text>
            <Text>{company.address}</Text>
            <Text>{company.postalCode}</Text>
            <Text>{company.country}</Text>
            <Text>SIRET: {company.siret}</Text>
            <Text>Tél: {company.phone}</Text>
          </View>
          <View style={styles.clientInfo}>
            <Text>{client.firstName} {client.lastName}</Text>
            <Text>{client.address}</Text>
            <Text>{client.phone}</Text>
            <Text>{client.email}</Text>
          </View>
        </View>

        {/* Titre et Numéro */}
        <View>
          <Text style={styles.title}>
            {type === 'invoice' ? 'FACTURE' : 'DEVIS'} N° {number}
          </Text>
          <Text>Date: {new Date(date).toLocaleDateString()}</Text>
          {type === 'invoice' ? (
            <Text>Date d'échéance: {new Date(dueDate!).toLocaleDateString()}</Text>
          ) : (
            <Text>Valable jusqu'au: {new Date(validUntil!).toLocaleDateString()}</Text>
          )}
        </View>

        {/* Tableau des prestations */}
        <View style={styles.table}>
          <View style={styles.tableHeader}>
            <Text style={styles.description}>Description</Text>
            <Text style={styles.quantity}>Quantité</Text>
            <Text style={styles.unitPrice}>Prix unitaire</Text>
            <Text style={styles.total}>Total</Text>
          </View>
          {items.map((item, index) => (
            <View key={index} style={styles.tableRow}>
              <Text style={styles.description}>{item.description}</Text>
              <Text style={styles.quantity}>{item.quantity}</Text>
              <Text style={styles.unitPrice}>{item.unitPrice.toFixed(2)} €</Text>
              <Text style={styles.total}>{(item.quantity * item.unitPrice).toFixed(2)} €</Text>
            </View>
          ))}
        </View>

        {/* Totaux */}
        <View style={styles.totals}>
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total HT:</Text>
            <Text style={styles.totalValue}>{totalHT.toFixed(2)} €</Text>
          </View>
          {tva && (
            <View style={styles.totalRow}>
              <Text style={styles.totalLabel}>TVA ({tva}%):</Text>
              <Text style={styles.totalValue}>{(totalHT * (tva / 100)).toFixed(2)} €</Text>
            </View>
          )}
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total TTC:</Text>
            <Text style={styles.totalValue}>{totalTTC.toFixed(2)} €</Text>
          </View>
        </View>

        {/* Pied de page */}
        <View style={styles.footer}>
          <Text>{company.name} - SIRET: {company.siret}</Text>
          <Text>{company.address}, {company.postalCode}, {company.country}</Text>
          <Text>IBAN: {company.iban}</Text>
        </View>
      </Page>
    </Document>
  );
} 