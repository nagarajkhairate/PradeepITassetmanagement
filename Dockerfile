# Use the official Grafana image
FROM grafana/grafana:latest

# Set environment variables (optional)
ENV GF_SECURITY_ADMIN_PASSWORD=admin

# Expose Grafana's default port
EXPOSE 3000

# Start Grafana when the container is run
CMD ["/bin/bash", "-c", "/usr/sbin/grafana-server"]
