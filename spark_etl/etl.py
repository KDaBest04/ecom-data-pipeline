from pyspark.sql import SparkSession
from pyspark.sql.functions import col, to_timestamp


def main():
    print("🚀 Khởi tạo Spark Session...")
    # Cấu hình tự động tải driver kết nối với PostgreSQL
    spark = SparkSession.builder \
        .appName("Ecom_Data_Ingestion") \
        .config("spark.jars.packages", "org.postgresql:postgresql:42.7.3") \
        .getOrCreate()

    spark.sparkContext.setLogLevel("ERROR")

    # Đọc file CSV
    data_path = "../data/sample_data.csv"
    print(f"📦 Đang đọc dữ liệu từ: {data_path}")
    df = spark.read.csv(data_path, header=True, inferSchema=True)

    # Làm sạch: Bỏ các dòng lỗi và ép kiểu thời gian
    print("🧹 Đang làm sạch dữ liệu...")
    clean_df = df.dropna(subset=["user_id", "product_id"]) \
        .withColumn("event_time", to_timestamp(col("event_time")))

    clean_df.show(5)

    # Ghi dữ liệu vào PostgreSQL
    print("💾 Đang ghi dữ liệu vào PostgreSQL...")
    db_url = "jdbc:postgresql://localhost:5432/ecom_db"
    db_properties = {
        "user": "admin",
        "password": "password123",
        "driver": "org.postgresql.Driver"
    }

    # Đẩy data vào bảng raw_events
    clean_df.write.jdbc(url=db_url, table="raw_events", mode="overwrite", properties=db_properties)

    print("✅ Hoàn tất! Dữ liệu đã nằm gọn trong Database.")
    spark.stop()


if __name__ == "__main__":
    main()