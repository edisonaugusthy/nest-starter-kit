import { Logger } from '@nestjs/common';

import { Fragment, JsonFragment, ethers } from 'ethers';

const authApiUrl = process.env.authApiUrl;

export default class EthersUtil {
  private provider: ethers.JsonRpcProvider;
  private readonly chainId: number;
  private readonly logger = new Logger(EthersUtil.name);

  constructor(blockchainConfig) {
    const { chainId } = blockchainConfig;
    this.chainId = chainId;
  }

  private async setProvider(activeBlockChainNodeUrl): Promise<void> {

    this.provider = new ethers.JsonRpcProvider(activeBlockChainNodeUrl
    );
  }

  async call(createTransactionRequestBodyDto): Promise<string> {
    try {
      return await this.provider.call({
        to: createTransactionRequestBodyDto.to,
        data: createTransactionRequestBodyDto.encodedData,
      });
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.call');
      throw error;
    }
  }
  async getCode(contractAddress: string): Promise<string> {
    try {
      const code = await this.provider.getCode(contractAddress);
      return ethers.formatEther(code);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getCode');
      throw error;
    }
  }

  async getBalance(walletAddress: string): Promise<string> {
    try {
      const balance = await this.provider.getBalance(walletAddress);
      return ethers.formatEther(balance);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getBalance');
      throw error;
    }
  }

  async estimateGas(estimateGasRequestBody) {
    const payload = estimateGasRequestBody.value
      ? {
          ...estimateGasRequestBody,
          value: ethers.parseEther(estimateGasRequestBody.value),
        }
      : estimateGasRequestBody;
    try {
      return await this.provider.estimateGas(payload);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.estimateGas');
      throw error;
    }
  }

  async getGasPrice() {
    try {
      return await this.provider.getFeeData()
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getGasPrice');
      throw error;
    }
  }

  async getTransactionCount(walletAddress: string): Promise<number> {
    try {
      return await this.provider.getTransactionCount(walletAddress);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getTransactionCount');
      throw error;
    }
  }

  async getTransactionReceipt(transactionHash: string) {
    try {
      return await this.provider.getTransactionReceipt(transactionHash);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getTransactionReceipt');
      throw error;
    }
  }

  async getTransaction(transactionHash: string) {
    try {
      return await this.provider.getTransaction(transactionHash);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getTransaction');
      throw error;
    }
  }

  async getBlockNumber(): Promise<number> {
    try {
      return await this.provider.getBlockNumber();
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getBlockNumber');
      throw error;
    }
  }

  // move to provider
  async getNonce(from: string): Promise<number> {
    try {
      return await this.provider.getTransactionCount(from, 'pending');
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.getNonce');
      throw error;
    }
  }

  async resolveName(name: string): Promise<string> {
    try {
      return await this.provider.resolveName(name);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.resolveName');
      throw error;
    }
  }

  async sendSignedTransaction(signedTransaction: string): Promise<{ transactionHash: string }> {
    try {
      this.logger.debug(`signedTransaction: ${signedTransaction}`, 'EthersUtil.sendSignedTransaction');
      const transaction = await this.provider.broadcastTransaction(signedTransaction);
      this.logger.debug(
        `Logging transaction response: ${JSON.stringify(transaction, null, 2)}`,
        'EthersUtil.sendSignedTransaction',
      );
      const transactionHash = transaction.hash;
      this.logger.debug(`transactionHash: ${transactionHash}`, 'EthersUtil.sendSignedTransaction');
      return { transactionHash };
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.sendSignedTransaction');
      throw error;
    }
  }



  async waitForTransactionReceipt(transactionHash: string) {
    try {
      this.logger.log('Debugger - EthersUtil.waitForTransactionReceipt');
      return await this.provider.getTransactionReceipt(transactionHash);
    } catch (error) {
      this.logger.error(error.message, error.stack, 'EthersUtil.waitForTransactionReceipt');
      throw error;
    }
  }



  async deploySmartContract({
    from,
    encodedData,
    nonce,
    clientCredential,
    organizationId,
  }: {
    from: string;
    encodedData: string;
    nonce: number;
    clientCredential: string;
    organizationId: string;
  }): Promise<{ transactionHash: string }> {
    const payload = { chainId: this.chainId, data: encodedData };
    let gasPriceWithPremium: number, gasLimitWithPremium: number;
    try {
      //   // todo fail case decode with code
      //   //  1. store error status
      //   //  2. store error reason
      //const gasPricePremium = ethers.BigNumber.from(process.env.gas_price_premium);
      const percPremiumGasPrice = parseInt(process.env.premium_gas_price);
      const percPremiumGasLimit = parseInt(process.env.premium_gas_limit);
      this.logger.debug(`gasPrice premium is set at  ${percPremiumGasPrice} %`, 'deploySmartContract');
      const gasPrice = await this.provider.getFeeData();
      this.logger.debug(`gasPrice is: ${gasPrice}`, 'deploySmartContract');
      //gasPriceWithPremium = gasPrice.add(gasPricePremium);
      gasPriceWithPremium =1000
      this.logger.debug(`gasPriceWithPremium is: ${gasPriceWithPremium}`, 'deploySmartContract');
      this.logger.debug(
        `payload for estimating gas is: chainId ${payload.chainId} data ${payload.data}`,
        'deploySmartContract',
      );
      this.logger.debug(`gasLimit premium is set at  ${percPremiumGasLimit} %`, 'deploySmartContract');
      const gasLimit = await this.provider.estimateGas(payload);
      this.logger.debug(`gasLimit is: ${gasLimit}`, 'deploySmartContract');
      this.logger.debug(`gasLimit with premium: ${gasLimitWithPremium}`, 'deploySmartContract');

      const input = {
        dataToBeSigned: {
          ...payload,
          gasPrice: gasPriceWithPremium,
          nonce,
          gasLimit: gasLimitWithPremium,
        },
        clientCredential,
        from,
        organizationId,
      };

      this.logger.debug(
        `about to call signTransactionByBec with input : ${JSON.stringify(input)}`,
        'deploySmartContract',
      );
      const signTx = 'signed transaction'
      this.logger.debug(`get signTx from bec: ${signTx}`, 'deploySmartContract');
      const transactionHash = await this.sendSignedTransaction(signTx);
      this.logger.debug(`transaction hash is: ${transactionHash}`, 'deploySmartContract');
      return transactionHash;
    } catch (error) {
      this.logger.error(error.message, error.stack, 'deploySmartContract');
      throw error;
    }
  }
}