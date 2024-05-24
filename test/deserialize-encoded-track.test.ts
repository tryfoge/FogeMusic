import { DataReader } from "@lavacoffee/datarw"

const encoded = "QAAAjQIAJVJpY2sgQXN0bGV5IC0gTmV2ZXIgR29ubmEgR2l2ZSBZb3UgVXAADlJpY2tBc3RsZXlWRVZPAAAAAAADPCAAC2RRdzR3OVdnWGNRAAEAK2h0dHBzOi8vd3d3LnlvdXR1YmUuY29tL3dhdGNoP3Y9ZFF3NHc5V2dYY1EAB3lvdXR1YmUAAAAAAAAAAA=="
const reader = new DataReader(Buffer.from(encoded, 'base64'))

console.log('Version', reader.read())
console.log(reader.readUTF()) // Title
console.log(reader.readUTF()) // Author
console.log(reader.readLong()) // Duration
console.log(reader.readUTF()) // identifier
console.log(reader.readBool()) // is stream
console.log(reader.readNullableText()) // url
console.log(reader.readUTF()) // source name
// console.log(reader.readLong())
console.log(reader.readLong())
console.log(reader.size, reader.position)

// Try run this if you are brave :3 <3 <3