const request = require('request');
const fs = require('fs');

class DownloadService {
    downloadFile(file_url: string, targetPath: string, onProgress?: Function) {
        // Save variable to know progress
        let received_bytes = 0;
        let total_bytes = 0;

        const req = request({
            method: 'GET',
            uri: file_url,
            agentOptions: {
                rejectUnauthorized: false
            }
        });

        const out = fs.createWriteStream(targetPath);
        req.pipe(out);

        req.on('response', function(data: any) {
            // Change the total bytes value to get progress later.
            total_bytes = parseInt(data.headers['content-length']);
        });

        req.on('data', (chunk: any) => {
            // Update the received bytes
            received_bytes += chunk.length;
            if (onProgress) {
                const pct = (received_bytes * 100) / total_bytes;
                onProgress(pct);
            }
        });

        req.on('end', function() {});
    }

    downloadFileAsync(file_url: string, targetPath: string, onProgress?: Function): Promise<boolean> {
        return new Promise(function(resolve, reject) {
            // Save variable to know progress
            let received_bytes = 0;
            let total_bytes = 0;

            const req = request({
                method: 'GET',
                uri: file_url,
                agentOptions: {
                    rejectUnauthorized: false
                }
            });

            const out = fs.createWriteStream(targetPath);
            req.pipe(out);

            req.on('response', function(data: any) {
                // Change the total bytes value to get progress later.
                total_bytes = parseInt(data.headers['content-length']);
            });

            // Get progress if callback exists
            req.on('data', function(chunk: any) {
                // Update the received bytes
                received_bytes += chunk.length;
                if (onProgress) {
                    const pct = (received_bytes * 100) / total_bytes;
                    onProgress(pct);
                }
            });

            req.on('end', function() {
                resolve(true);
            });
        });
    }
}

export default new DownloadService();
