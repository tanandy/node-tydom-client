import crypto from 'crypto';

export const md5Sync = (data: crypto.BinaryLike): Buffer => crypto.createHash('md5').update(data).digest();
export const md5 = (data: crypto.BinaryLike): Promise<Buffer> =>
  new Promise((resolve, reject) => {
    try {
      const hash = crypto.createHash('md5');
      hash.on('readable', () => {
        resolve(hash.read());
      });
      hash.write(data);
      hash.end();
    } catch (err) {
      reject(err);
    }
  });

export const getRandomBytes = async (size = 256): Promise<Buffer> => {
  return new Promise((resolve, reject) => {
    crypto.randomBytes(size, (err, buf) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(buf);
    });
  });
};

let requestCounterValue = 0;
export const getRequestCounter = (): string => {
  requestCounterValue += 1;
  const nc = requestCounterValue + '';
  return ('00000000' + nc).substr(nc.length);
};
