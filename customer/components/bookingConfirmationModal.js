<Modal
  offset={this.state.offset}
  open={this.state.open}
  modalDidOpen={() => console.log('modal did open')}
  modalDidClose={() => this.setState({open: false})}
  style={{}}>
  <View style={{paddingHorizontal:10,paddingVertical:15, }}>
    <Text style={styles.textCart}>Pesananmu sudah masuk keranjang</Text>
    <View style={{marginVertical:10}}>
      <Button
        containerStyle={globalStyles.ctaButton2}
        style={{fontSize: 14, color: '#fff', fontFamily:'Hind-SemiBold'}}
        onPress={() => this.setState({open: false})}
      >
        Lanjut ke Pembayaran
      </Button>
    </View>
    <View >
      <Button
        containerStyle={globalStyles.ctaButton3}
        style={{fontSize: 14, color: '#ff5f5f', fontFamily:'Hind',}}
        onPress={() => this.setState({open: false})}
      >
        Tambah Activity Lainnya
      </Button>
    </View>
    {/*<TouchableOpacity
      style={{margin: 5}}
      onPress={() => this.setState({open: false})}>
      <Text>Close modal</Text>
    </TouchableOpacity>*/}
  </View>
</Modal>