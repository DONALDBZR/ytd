-- Creating the database
CREATE DATABASE YouTubeDownloader;
-- Creating the Downloads Table
CREATE TABLE YouTubeDownloader.Downloads(
    DownloadsId INT PRIMARY KEY AUTO_INCREMENT,
    DownloadsArtist VARCHAR(128),
    DownloadsTitle VARCHAR(128),
    DownloadsSize VARCHAR(16),
    DownloadsCategory VARCHAR(8)
);
-- Modifying the field required
ALTER TABLE YouTubeDownloader.Downloads MODIFY DownloadsTitle VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;
ALTER TABLE YouTubeDownloader.Downloads MODIFY DownloadsArtist VARCHAR(128) CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;