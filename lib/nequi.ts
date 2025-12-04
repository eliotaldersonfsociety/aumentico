import axios from 'axios';

interface BreBPaymentRequest {
  amount: number; // en COP
  description: string;
  reference: string;
  returnUrl: string;
  notifyUrl: string;
}

interface BreBPaymentResponse {
  success: boolean;
  qrCodeUrl?: string;
  paymentUrl?: string;
  reference?: string;
  error?: string;
}

export class BreBAPI {
  private baseUrl: string;
  private apiKey: string;
  private secretKey: string;

  constructor(baseUrl: string, apiKey: string, secretKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
    this.secretKey = secretKey;
  }

  async createPaymentRequest(data: BreBPaymentRequest): Promise<BreBPaymentResponse> {
    try {
      const response = await axios.post(
        `${this.baseUrl}/create-payment`,
        {
          amount: data.amount,
          description: data.description,
          reference: data.reference,
          returnUrl: data.returnUrl,
          notifyUrl: data.notifyUrl,
        },
        {
          headers: {
            'Authorization': `Bearer ${this.apiKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      return {
        success: true,
        qrCodeUrl: response.data.qrCodeUrl,
        paymentUrl: response.data.paymentUrl,
        reference: data.reference,
      };
    } catch (error: any) {
      return {
        success: false,
        error: error.response?.data?.message || 'Error al crear el cobro',
      };
    }
  }
}